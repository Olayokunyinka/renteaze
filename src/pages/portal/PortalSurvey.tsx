import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PortalShell from "@/components/portal/PortalShell";
import AddressAutocomplete from "@/components/auth/AddressAutocomplete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, dashboardPathForRole } from "@/hooks/useAuth";
import { COUNTRIES, NIGERIAN_STATES } from "@/data/nigeria";

const NON_WORKING = ["student", "retired", "unemployed"];
const RESIDENTIAL_TYPES = ["tenement", "flat", "bungalow", "duplex"];

type Coords = { lat: number; lon: number };
type Opt = { v: string; l: string };

const PortalSurvey = () => {
  const { user, profile, roles, refreshProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [group, setGroup] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [a, setA] = useState<Record<string, string>>({ country: "NG" });
  const [residenceCoords, setResidenceCoords] = useState<Coords | null>(null);
  const [officeCoords, setOfficeCoords] = useState<Coords | null>(null);

  const editMode = !!profile?.survey_completed;

  // Prefill from existing profile data
  useEffect(() => {
    if (!profile) return;
    const p = profile as Record<string, unknown>;
    const get = (k: string) => (p[k] == null ? "" : String(p[k]));
    setA({
      country: get("country") || "NG",
      q1: get("gender"),
      q2: get("marital_status"),
      q3: get("age_range"),
      q4: get("state_of_residence"),
      q5: get("address_of_residence"),
      q6: get("occupation"),
      q7: get("office_address"),
      q8: get("accommodation_type"),
      bedrooms: get("bedrooms"),
      bathrooms: get("bathrooms"),
      toilets: get("toilets"),
      q9: p.is_current_tenant === true ? "yes" : p.is_current_tenant === false ? "no" : "",
      q10: get("tenancy_property_type"),
      q11: get("annual_rent_range"),
      q12: get("tenancy_period"),
      q13: get("tenancy_duration"),
      q14: get("pays_rent_to"),
      q15: get("rent_payment_ease"),
      q16: get("pays_on_time"),
      q17: get("rent_payment_method"),
      q18: p.sought_rent_help_before === true ? "yes" : p.sought_rent_help_before === false ? "no" : "",
      q19: get("interested_in_platform"),
      q20: get("acquisition_source"),
      q21: p.marketing_consent === true ? "yes" : p.marketing_consent === false ? "no" : "",
    });
    if (p.address_lat && p.address_lon) setResidenceCoords({ lat: Number(p.address_lat), lon: Number(p.address_lon) });
    if (p.office_lat && p.office_lon) setOfficeCoords({ lat: Number(p.office_lat), lon: Number(p.office_lon) });
  }, [profile]);

  const set = (k: string, v: string) => setA((prev) => ({ ...prev, [k]: v }));
  const isTenant = a.q9 === "yes";
  const occupationLower = (a.q6 || "").toLowerCase().trim();
  const showOffice = a.q6 && !NON_WORKING.includes(occupationLower);
  const isResidential = RESIDENTIAL_TYPES.includes(a.q8 || "");

  if (loading) return (
    <PortalShell role={roles[0] || "tenant"}>
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading survey...</p>
        </div>
      </div>
    </PortalShell>
  );

  if (!user) {
    navigate("/signin");
    return null;
  }

  const exit = () => navigate(dashboardPathForRole(roles[0]));

  const validateGroup = (g: number): boolean => {
    if (g === 1) return !!(a.country && a.q1 && a.q2 && a.q3 && a.q4 && a.q5);
    if (g === 2) {
      if (!a.q6 || !a.q8) return false;
      if (showOffice && !a.q7) return false;
      if (isResidential && !(a.bedrooms && a.bathrooms && a.toilets)) return false;
      return true;
    }
    if (g === 3) {
      if (!a.q9) return false;
      if (a.q9 === "yes") return !!(a.q10 && a.q11 && a.q12 && a.q13 && a.q14);
      return true;
    }
    if (g === 4) return !isTenant ? true : !!(a.q15 && a.q16 && a.q17 && a.q18);
    if (g === 5) return !!(a.q19 && a.q20 && a.q21);
    return true;
  };

  const next = () => {
    if (!validateGroup(group)) {
      toast.error("Please answer all questions in this group");
      return;
    }
    let n = group + 1;
    if (n === 4 && !isTenant) n = 5;
    setGroup(Math.min(n, 5));
  };

  const back = () => {
    let n = group - 1;
    if (n === 4 && !isTenant) n = 3;
    setGroup(Math.max(n, 1));
  };

  const submit = async () => {
    if (!validateGroup(5)) {
      toast.error("Please answer all questions");
      return;
    }
    setSubmitting(true);
    try {
      const tags: string[] = [];
      const rentRanges: Record<string, number> = {
        "lt100k": 50000, "100-500k": 500000, "501k-1m": 1000000, "1-3m": 3000000, "3-10m": 10000000, "gt10m": 20000000,
      };
      const rentValue = a.q11 ? rentRanges[a.q11] || 0 : 0;
      const ease = parseInt(a.q15 || "0");

      if (rentValue >= 501000 && ease >= 4) tags.push("HIGH_PRIORITY_LOAN_PROSPECT");
      if (a.q17 === "save_up") tags.push("SAVE_FOR_RENT_PROSPECT");
      if (a.q17 === "loan") tags.push("EXISTING_LOAN_BEHAVIOUR");
      if (a.q18 === "yes") tags.push("STRUGGLED_TO_PAY");
      if (a.q9 === "no") tags.push("NON_TENANT");
      if (a.q19 === "yes") tags.push("HIGH_INTENT");

      const { error } = await supabase.from("profiles").update({
        survey_completed: true,
        survey_completed_at: new Date().toISOString(),
        country: a.country,
        gender: a.q1, marital_status: a.q2, age_range: a.q3,
        state_of_residence: a.q4, address_of_residence: a.q5,
        address_lat: residenceCoords?.lat ?? null,
        address_lon: residenceCoords?.lon ?? null,
        occupation: a.q6, office_address: a.q7 || null,
        office_lat: officeCoords?.lat ?? null,
        office_lon: officeCoords?.lon ?? null,
        accommodation_type: a.q8,
        bedrooms: isResidential && a.bedrooms ? parseInt(a.bedrooms) : null,
        bathrooms: isResidential && a.bathrooms ? parseInt(a.bathrooms) : null,
        toilets: isResidential && a.toilets ? parseInt(a.toilets) : null,
        is_current_tenant: a.q9 === "yes",
        tenancy_property_type: a.q10 || null, annual_rent_range: a.q11 || null,
        tenancy_period: a.q12 || null, tenancy_duration: a.q13 || null,
        pays_rent_to: a.q14 || null,
        rent_payment_ease: a.q15 ? parseInt(a.q15) : null,
        pays_on_time: a.q16 || null, rent_payment_method: a.q17 || null,
        sought_rent_help_before: a.q18 ? a.q18 === "yes" : null,
        interested_in_platform: a.q19, acquisition_source: a.q20,
        marketing_consent: a.q21 === "yes",
      }).eq("id", user.id);

      if (error) throw error;
      await supabase.rpc("set_my_crm_tags", { _tags: tags });
      
      // Verify the update actually affected rows
      const { count } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("id", user.id);
      
      if (count === 0) {
        // Profile doesn't exist, create it
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id,
          survey_completed: true,
          survey_completed_at: new Date().toISOString(),
          country: a.country,
          gender: a.q1, marital_status: a.q2, age_range: a.q3,
          state_of_residence: a.q4, address_of_residence: a.q5,
          address_lat: residenceCoords?.lat ?? null,
          address_lon: residenceCoords?.lon ?? null,
          occupation: a.q6, office_address: a.q7 || null,
          office_lat: officeCoords?.lat ?? null,
          office_lon: officeCoords?.lon ?? null,
          accommodation_type: a.q8,
          bedrooms: isResidential && a.bedrooms ? parseInt(a.bedrooms) : null,
          bathrooms: isResidential && a.bathrooms ? parseInt(a.bathrooms) : null,
          toilets: isResidential && a.toilets ? parseInt(a.toilets) : null,
          is_current_tenant: a.q9 === "yes",
          tenancy_property_type: a.q10 || null, annual_rent_range: a.q11 || null,
          tenancy_period: a.q12 || null, tenancy_duration: a.q13 || null,
          pays_rent_to: a.q14 || null,
          rent_payment_ease: a.q15 ? parseInt(a.q15) : null,
          pays_on_time: a.q16 || null, rent_payment_method: a.q17 || null,
          sought_rent_help_before: a.q18 ? a.q18 === "yes" : null,
          interested_in_platform: a.q19, acquisition_source: a.q20,
          marketing_consent: a.q21 === "yes",
        });
        if (insertError) throw insertError;
        await supabase.rpc("set_my_crm_tags", { _tags: tags });
      }
      
      await refreshProfile();
      toast.success(editMode ? "Profile updated" : "Profile complete!", {
        description: editMode ? "Your changes have been saved." : "We have personalised your experience.",
      });
      navigate(dashboardPathForRole(roles[0]));
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  // Dropdown helper (replaces radio groups)
  const SEL = (name: string, opts: Opt[], placeholder = "Select an option") => (
    <Select value={a[name] || ""} onValueChange={(v) => set(name, v)}>
      <SelectTrigger className="mt-1"><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>
        {opts.map((o) => <SelectItem key={o.v} value={o.v}>{o.l}</SelectItem>)}
      </SelectContent>
    </Select>
  );

  const numberSelect = (name: string, max: number, label: string) => (
    <div>
      <Label>{label}</Label>
      <Select value={a[name] || ""} onValueChange={(v) => set(name, v)}>
        <SelectTrigger className="mt-1"><SelectValue placeholder={`Select ${label.toLowerCase()}`} /></SelectTrigger>
        <SelectContent>
          {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
            <SelectItem key={n} value={String(n)}>
              {n === max ? `${n}+` : n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <PortalShell role={roles[0] || "tenant"}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">
              {editMode ? "Review Your Profile" : "Complete Your Profile"}
            </h1>
            <div className="text-sm text-muted-foreground">
              Step {group} of 5
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(group / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Group 1: Basic Info */}
          {group === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Basic Information</h2>

              <div>
                <Label>Country</Label>
                {SEL("country", COUNTRIES.map(c => ({ v: c.code, l: c.name })), "Select your country")}
              </div>

              <div>
                <Label>Gender</Label>
                {SEL("q1", [
                  { v: "male", l: "Male" },
                  { v: "female", l: "Female" },
                  { v: "other", l: "Other" },
                  { v: "prefer_not_to_say", l: "Prefer not to say" },
                ])}
              </div>

              <div>
                <Label>Marital Status</Label>
                {SEL("q2", [
                  { v: "single", l: "Single" },
                  { v: "married", l: "Married" },
                  { v: "divorced", l: "Divorced" },
                  { v: "widowed", l: "Widowed" },
                  { v: "separated", l: "Separated" },
                ])}
              </div>

              <div>
                <Label>Age Range</Label>
                {SEL("q3", [
                  { v: "18-24", l: "18-24" },
                  { v: "25-34", l: "25-34" },
                  { v: "35-44", l: "35-44" },
                  { v: "45-54", l: "45-54" },
                  { v: "55-64", l: "55-64" },
                  { v: "65+", l: "65+" },
                ])}
              </div>

              <div>
                <Label>State of Residence</Label>
                {SEL("q4", NIGERIAN_STATES.map(s => ({ v: s, l: s })), "Select your state")}
              </div>

              <div>
                <Label>Address of Residence</Label>
                <AddressAutocomplete
                  value={a.q5 || ""}
                  onChange={(v, coords) => { set("q5", v); if (coords) setResidenceCoords(coords); }}
                  placeholder="Enter your full address"
                />
              </div>
            </div>
          )}

          {/* Group 2: Occupation & Accommodation */}
          {group === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Occupation & Accommodation</h2>

              <div>
                <Label>Occupation</Label>
                <Input
                  value={a.q6 || ""}
                  onChange={(e) => set("q6", e.target.value)}
                  placeholder="e.g. Software Engineer, Teacher, Business Owner"
                />
              </div>

              {showOffice && (
                <div>
                  <Label>Office Address</Label>
                  <AddressAutocomplete
                    value={a.q7 || ""}
                    onChange={(v, coords) => { set("q7", v); if (coords) setOfficeCoords(coords); }}
                    placeholder="Enter your office address"
                  />
                </div>
              )}

              <div>
                <Label>Accommodation Type</Label>
                {SEL("q8", [
                  { v: "tenement", l: "Tenement/Face-to-face" },
                  { v: "flat", l: "Flat" },
                  { v: "bungalow", l: "Bungalow" },
                  { v: "duplex", l: "Duplex" },
                  { v: "terraced", l: "Terraced House" },
                  { v: "semi_detached", l: "Semi-detached" },
                  { v: "detached", l: "Detached House" },
                  { v: "apartment", l: "Apartment" },
                  { v: "condo", l: "Condominium" },
                  { v: "other", l: "Other" },
                ])}
              </div>

              {isResidential && (
                <div className="grid grid-cols-3 gap-4">
                  {numberSelect("bedrooms", 10, "Bedrooms")}
                  {numberSelect("bathrooms", 10, "Bathrooms")}
                  {numberSelect("toilets", 10, "Toilets")}
                </div>
              )}
            </div>
          )}

          {/* Group 3: Tenancy Status */}
          {group === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Tenancy Status</h2>

              <div>
                <Label>Are you currently a tenant?</Label>
                {SEL("q9", [
                  { v: "yes", l: "Yes" },
                  { v: "no", l: "No" },
                ])}
              </div>

              {isTenant && (
                <>
                  <div>
                    <Label>What type of property do you rent?</Label>
                    {SEL("q10", [
                      { v: "room", l: "Single Room" },
                      { v: "flat", l: "Flat" },
                      { v: "bungalow", l: "Bungalow" },
                      { v: "duplex", l: "Duplex" },
                      { v: "apartment", l: "Apartment" },
                      { v: "other", l: "Other" },
                    ])}
                  </div>

                  <div>
                    <Label>Annual Rent Range</Label>
                    {SEL("q11", [
                      { v: "lt100k", l: "Less than ₦100,000" },
                      { v: "100-500k", l: "₦100,000 - ₦500,000" },
                      { v: "501k-1m", l: "₦501,000 - ₦1,000,000" },
                      { v: "1-3m", l: "₦1,000,000 - ₦3,000,000" },
                      { v: "3-10m", l: "₦3,000,000 - ₦10,000,000" },
                      { v: "gt10m", l: "More than ₦10,000,000" },
                    ])}
                  </div>

                  <div>
                    <Label>How long have you been renting this property?</Label>
                    {SEL("q12", [
                      { v: "lt1year", l: "Less than 1 year" },
                      { v: "1-2years", l: "1-2 years" },
                      { v: "3-5years", l: "3-5 years" },
                      { v: "6-10years", l: "6-10 years" },
                      { v: "gt10years", l: "More than 10 years" },
                    ])}
                  </div>

                  <div>
                    <Label>How long is your current tenancy agreement?</Label>
                    {SEL("q13", [
                      { v: "monthly", l: "Monthly" },
                      { v: "quarterly", l: "Quarterly" },
                      { v: "biannually", l: "Bi-annually" },
                      { v: "annually", l: "Annually" },
                      { v: "other", l: "Other" },
                    ])}
                  </div>

                  <div>
                    <Label>Who do you pay rent to?</Label>
                    {SEL("q14", [
                      { v: "landlord", l: "Directly to landlord" },
                      { v: "agent", l: "Through an agent" },
                      { v: "caretaker", l: "Through a caretaker" },
                      { v: "other", l: "Other" },
                    ])}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Group 4: Rent Payment Experience */}
          {group === 4 && isTenant && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Rent Payment Experience</h2>

              <div>
                <Label>How easy is it for you to pay your rent on time?</Label>
                {SEL("q15", [
                  { v: "1", l: "Very difficult" },
                  { v: "2", l: "Difficult" },
                  { v: "3", l: "Neutral" },
                  { v: "4", l: "Easy" },
                  { v: "5", l: "Very easy" },
                ])}
              </div>

              <div>
                <Label>Do you pay your rent on time?</Label>
                {SEL("q16", [
                  { v: "always", l: "Always" },
                  { v: "usually", l: "Usually" },
                  { v: "sometimes", l: "Sometimes" },
                  { v: "rarely", l: "Rarely" },
                  { v: "never", l: "Never" },
                ])}
              </div>

              <div>
                <Label>How do you typically pay rent?</Label>
                {SEL("q17", [
                  { v: "cash", l: "Cash" },
                  { v: "transfer", l: "Bank transfer" },
                  { v: "cheque", l: "Cheque" },
                  { v: "pos", l: "POS/Card" },
                  { v: "save_up", l: "Save up over time" },
                  { v: "loan", l: "Take a loan" },
                  { v: "other", l: "Other" },
                ])}
              </div>

              <div>
                <Label>Have you ever sought help to pay rent?</Label>
                {SEL("q18", [
                  { v: "yes", l: "Yes" },
                  { v: "no", l: "No" },
                ])}
              </div>
            </div>
          )}

          {/* Group 5: Platform Interest */}
          {group === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Platform Interest</h2>

              <div>
                <Label>Are you interested in using Renteaze platform?</Label>
                {SEL("q19", [
                  { v: "yes", l: "Yes, very interested" },
                  { v: "maybe", l: "Maybe, need more information" },
                  { v: "no", l: "No, not interested" },
                ])}
              </div>

              <div>
                <Label>How did you hear about Renteaze?</Label>
                {SEL("q20", [
                  { v: "social_media", l: "Social media" },
                  { v: "friend_family", l: "Friend/Family" },
                  { v: "online_search", l: "Online search" },
                  { v: "advertisement", l: "Advertisement" },
                  { v: "event", l: "Event/Conference" },
                  { v: "news_article", l: "News article" },
                  { v: "other", l: "Other" },
                ])}
              </div>

              <div>
                <Label>Would you like to receive marketing communications from Renteaze?</Label>
                {SEL("q21", [
                  { v: "yes", l: "Yes" },
                  { v: "no", l: "No" },
                ])}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <div>
            {group > 1 && (
              <Button variant="outline" onClick={back}>
                Back
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={exit}>
              {editMode ? "Cancel" : "Skip for Now"}
            </Button>

            {group < 5 ? (
              <Button onClick={next}>
                Next
              </Button>
            ) : (
              <Button onClick={submit} disabled={submitting}>
                {submitting ? "Saving..." : editMode ? "Update Profile" : "Complete Profile"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </PortalShell>
  );
};

export default PortalSurvey;