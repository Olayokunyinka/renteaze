import PortalShell from "@/components/portal/PortalShell";
import PortalPlaceholder from "@/components/portal/PortalPlaceholder";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => (
  <PortalShell role="professional">
    <PortalPlaceholder icon={SettingsIcon} title="Settings" description="Update your profile, payout and association details." />
  </PortalShell>
);

export default Settings;
