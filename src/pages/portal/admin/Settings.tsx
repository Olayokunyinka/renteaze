import PortalShell from "@/components/portal/PortalShell";
import PortalPlaceholder from "@/components/portal/PortalPlaceholder";
import { Shield } from "lucide-react";

const Settings = () => (
  <PortalShell role="admin">
    <PortalPlaceholder icon={Shield} title="System Settings" description="Platform configuration and operational controls." />
  </PortalShell>
);

export default Settings;
