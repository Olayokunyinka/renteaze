import PortalShell from "@/components/portal/PortalShell";
import PortalPlaceholder from "@/components/portal/PortalPlaceholder";
import { CreditCard } from "lucide-react";

const Loans = () => (
  <PortalShell role="tenant">
    <PortalPlaceholder icon={CreditCard} title="My Loans" description="Apply for a rent loan and track repayments." />
  </PortalShell>
);

export default Loans;
