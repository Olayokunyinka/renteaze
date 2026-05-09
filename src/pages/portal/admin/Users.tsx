import PortalShell from "@/components/portal/PortalShell";
import PortalPlaceholder from "@/components/portal/PortalPlaceholder";
import { Users as UsersIcon } from "lucide-react";

const Users = () => (
  <PortalShell role="admin">
    <PortalPlaceholder icon={UsersIcon} title="Users" description="Search, review and manage Renteaze users." />
  </PortalShell>
);

export default Users;
