import PortalShell from "@/components/portal/PortalShell";
import PortalPlaceholder from "@/components/portal/PortalPlaceholder";
import { PiggyBank } from "lucide-react";

const SaveForRent = () => (
  <PortalShell role="tenant">
    <PortalPlaceholder icon={PiggyBank} title="Save for Rent" description="Set a savings goal toward your next rent and track your milestones." />
  </PortalShell>
);

export default SaveForRent;
