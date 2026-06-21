import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { useAdminAuth } from "@/lib/admin/auth";

function AdminGate() {
  const { authed, ready } = useAdminAuth();
  if (!ready) {
    return <div className="min-h-screen bg-[oklch(0.985_0.005_250)]" />;
  }
  if (!authed) return <AdminLogin />;
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Console — WebApp Orbis" },
      { name: "description", content: "Internal admin console for WebApp Orbis." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminGate,
});
