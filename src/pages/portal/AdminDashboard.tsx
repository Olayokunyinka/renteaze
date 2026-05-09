import PortalShell from "@/components/portal/PortalShell";
import { useAuth } from "@/hooks/useAuth";
import { Users, FileText, Building2, Shield } from "lucide-react";

const AdminDashboard = () => {
  const { profile, roles } = useAuth();
  const role = roles.includes("admin") ? "admin" : "staff";
  return (
    <PortalShell role={role}>
      <h1 className="text-2xl font-bold mb-1">Admin{profile?.first_name ? `, ${profile.first_name}` : ""}</h1>
      <p className="text-sm text-muted-foreground mb-6">Operations console.</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card icon={Users} title="Users" body="Manage tenants, landlords, professionals." />
        <Card icon={FileText} title="Applications" body="Review pending professional approvals." />
        <Card icon={Building2} title="Properties" body="Approve listings and manage inventory." />
        <Card icon={Shield} title="System" body="Roles, settings and audit logs." />
      </div>
    </PortalShell>
  );
};

const Card = ({ icon: Icon, title, body }: { icon: typeof Users; title: string; body: string }) => (
  <div className="bg-card border rounded-xl p-5">
    <Icon className="h-6 w-6 text-primary" />
    <h3 className="mt-3 font-semibold">{title}</h3>
    <p className="mt-1 text-sm text-muted-foreground">{body}</p>
  </div>
);

export default AdminDashboard;
