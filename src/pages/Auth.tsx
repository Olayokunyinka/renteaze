import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Home, Building2, TrendingUp, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";

type Role = "tenant" | "landlord" | "investor";

const roleConfig = {
  tenant: { icon: Home, label: "Tenant", color: "text-primary" },
  landlord: { icon: Building2, label: "Landlord", color: "text-primary" },
  investor: { icon: TrendingUp, label: "Investor", color: "text-primary" },
};

const productLabels: Record<string, string> = {
  "save-for-rent": "Save for Rent",
  "loan-for-rent": "Loan for Rent",
  "add-on-funds": "Add-On Funds",
  "rent-upgrade": "Rent Upgrade",
  "save-to-own": "Save to Own",
  "rent-to-own": "Rent-to-Own",
  "monthly-rent": "Monthly Rent",
  "guaranteed-rent": "Guaranteed Rent",
  "save-for-my-house": "Save for My House",
  "property-management": "Property Management",
  "facility-management": "Facility Management",
  "construction-financing": "Construction Financing",
  "renovation-financing": "Renovation Financing",
  "repair-financing": "Repair Financing",
  "joint-ventures": "Joint Ventures",
  "property-sales": "Property Sales",
  "sponsorship-land-reward": "Sponsorship & Land Reward",
};

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get("role") as Role) || "tenant";
  const product = searchParams.get("product");

  const [activeTab, setActiveTab] = useState("register");
  const [role, setRole] = useState<Role>(initialRole);

  // Sign In state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Register shared state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Tenant fields
  const [annualRent, setAnnualRent] = useState("");
  const [location, setLocation] = useState("");

  // Landlord fields
  const [propertyAddress, setPropertyAddress] = useState("");
  const [numUnits, setNumUnits] = useState("");

  // Investor fields
  const [investmentInterest, setInvestmentInterest] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (searchParams.get("role")) {
      setRole(searchParams.get("role") as Role);
    }
  }, [searchParams]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Sign in successful!", { description: "Welcome back to Renteaze." });
    setSignInEmail("");
    setSignInPassword("");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const productName = product ? productLabels[product] : null;
    toast.success("Registration successful!", {
      description: productName
        ? `Welcome to Renteaze! We'll set up your ${productName} account shortly.`
        : `Welcome to Renteaze! Your ${roleConfig[role].label} account is being set up.`,
    });
    setName("");
    setEmail("");
    setPhone("");
    setAnnualRent("");
    setLocation("");
    setPropertyAddress("");
    setNumUnits("");
    setInvestmentInterest("");
    setCountry("");
  };

  const handleForgotPassword = () => {
    toast.info("Password reset link sent!", { description: "Check your email for instructions." });
  };

  return (
    <Layout>
      <section className="bg-navy text-navy-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            {activeTab === "register" ? "Create Your Account" : "Welcome Back"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {activeTab === "register"
              ? "Join thousands of Nigerians using Renteaze to rent, own, and invest smarter."
              : "Sign in to access your Renteaze dashboard."}
          </p>
          {product && productLabels[product] && (
            <div className="mt-4 inline-block bg-accent/20 text-accent px-4 py-2 rounded-md text-sm font-medium">
              Signing up for: {productLabels[product]}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
            </TabsList>

            {/* Sign In */}
            <TabsContent value="signin">
              <Card>
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSignIn} className="space-y-5">
                    <div>
                      <Label htmlFor="si-email">Email</Label>
                      <Input id="si-email" type="email" required value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} placeholder="you@example.com" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="si-password">Password</Label>
                      <Input id="si-password" type="password" required value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} placeholder="••••••••" className="mt-1" />
                    </div>
                    <button type="button" onClick={handleForgotPassword} className="text-sm text-primary hover:underline">
                      Forgot password?
                    </button>
                    <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground">
                      Sign In
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Register */}
            <TabsContent value="register">
              <Card>
                <CardContent className="p-6 md:p-8">
                  {/* Role Selector */}
                  <div className="mb-6">
                    <Label className="mb-2 block">I am a...</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {(Object.keys(roleConfig) as Role[]).map((r) => {
                        const cfg = roleConfig[r];
                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                              role === r
                                ? "border-primary bg-light-blue text-primary"
                                : "border-border hover:border-primary/40"
                            }`}
                          >
                            <cfg.icon className="h-5 w-5" />
                            {cfg.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="reg-name">Full Name</Label>
                      <Input id="reg-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="reg-email">Email</Label>
                      <Input id="reg-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="reg-phone">Phone Number</Label>
                      <Input id="reg-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234..." className="mt-1" />
                    </div>

                    {/* Role-specific fields */}
                    {role === "tenant" && (
                      <>
                        <div>
                          <Label htmlFor="reg-rent">Annual Rent Budget (₦)</Label>
                          <Input id="reg-rent" type="number" value={annualRent} onChange={(e) => setAnnualRent(e.target.value)} placeholder="e.g. 1200000" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="reg-location">Preferred Location</Label>
                          <Select value={location} onValueChange={setLocation}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select area" /></SelectTrigger>
                            <SelectContent>
                              {["Lekki", "Victoria Island", "Ikeja", "Yaba", "Ikoyi", "Surulere", "Ajah", "Other"].map((l) => (
                                <SelectItem key={l} value={l.toLowerCase()}>{l}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {role === "landlord" && (
                      <>
                        <div>
                          <Label htmlFor="reg-address">Property Address</Label>
                          <Input id="reg-address" value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} placeholder="Property location" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="reg-units">Number of Units</Label>
                          <Input id="reg-units" type="number" value={numUnits} onChange={(e) => setNumUnits(e.target.value)} placeholder="e.g. 4" className="mt-1" />
                        </div>
                      </>
                    )}

                    {role === "investor" && (
                      <>
                        <div>
                          <Label htmlFor="reg-interest">Investment Interest</Label>
                          <Select value={investmentInterest} onValueChange={setInvestmentInterest}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select interest" /></SelectTrigger>
                            <SelectContent>
                              {["Joint Ventures", "Property Purchase", "Facility Management", "Sponsorship & Land Reward"].map((i) => (
                                <SelectItem key={i} value={i.toLowerCase()}>{i}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="reg-country">Country of Residence</Label>
                          <Input id="reg-country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. United Kingdom" className="mt-1" />
                        </div>
                      </>
                    )}

                    <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:opacity-90 mt-2">
                      Create Account
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
