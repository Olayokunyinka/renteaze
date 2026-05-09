import PortalShell from "@/components/portal/PortalShell";
import PortalPlaceholder from "@/components/portal/PortalPlaceholder";
import { BarChart2 } from "lucide-react";

const Statements = () => (
  <PortalShell role="tenant">
    <PortalPlaceholder icon={BarChart2} title="Statements" description="Download your account statements and rent history." />
  </PortalShell>
);

export default Statements;
