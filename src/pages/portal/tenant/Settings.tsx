import PortalShell from "@/components/portal/PortalShell";
import PortalPlaceholder from "@/components/portal/PortalPlaceholder";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => (
  <PortalShell role="tenant">
    <PortalPlaceholder icon={SettingsIcon} title="Settings" description="Update your profile, password and notification preferences." />
  </PortalShell>
);

export default Settings;
