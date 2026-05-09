import PortalShell from "@/components/portal/PortalShell";
import PortalPlaceholder from "@/components/portal/PortalPlaceholder";
import { FileText } from "lucide-react";

const Documents = () => (
  <PortalShell role="tenant">
    <PortalPlaceholder icon={FileText} title="Documents" description="Tenancy agreements, receipts and proofs in one place." />
  </PortalShell>
);

export default Documents;
