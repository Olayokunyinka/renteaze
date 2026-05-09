import PortalShell from "@/components/portal/PortalShell";
import PortalPlaceholder from "@/components/portal/PortalPlaceholder";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => (
  <PortalShell role="landlord">
    <PortalPlaceholder icon={SettingsIcon} title="Settings" description="Update your profile, payout details and preferences." />
  </PortalShell>
);

export default Settings;
