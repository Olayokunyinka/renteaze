import PortalShell from "@/components/portal/PortalShell";
import PortalPlaceholder from "@/components/portal/PortalPlaceholder";
import { Building2 } from "lucide-react";

const Properties = () => (
  <PortalShell role="landlord">
    <PortalPlaceholder icon={Building2} title="My Properties" description="List, edit and manage your properties on Renteaze." />
  </PortalShell>
);

export default Properties;
