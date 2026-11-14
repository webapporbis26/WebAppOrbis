import { createFileRoute, Navigate } from "@tanstack/react-router";
import { CrudView } from "@/components/admin/CrudView";
import { renewalsConfig } from "@/lib/admin/schemas";
import { useAdminAuth } from "@/lib/admin/auth";

// Renewals is super-admin only (API JWT UserType). Normal admins are sent
// back to the dashboard even if they open the URL directly.
function RenewalsRoute() {
  const { ready, isSuperAdmin } = useAdminAuth();
  if (!ready) return null;
  if (!isSuperAdmin) return <Navigate to="/admin" replace />;
  return <CrudView config={renewalsConfig} />;
}

export const Route = createFileRoute("/admin/renewals")({
  component: RenewalsRoute,
});
