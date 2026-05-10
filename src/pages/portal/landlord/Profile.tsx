import PortalShell from "@/components/portal/PortalShell";
import ProfileEditForm from "@/components/ProfileEditForm";

const LandlordProfile = () => (
  <PortalShell role="landlord">
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">View and edit your personal information</p>
      </div>
      <ProfileEditForm />
    </div>
  </PortalShell>
);

export default LandlordProfile;
