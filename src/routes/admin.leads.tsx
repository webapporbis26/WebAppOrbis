import { createFileRoute } from "@tanstack/react-router";
import { CrudView } from "@/components/admin/CrudView";
import { leadsConfig } from "@/lib/admin/schemas";

export const Route = createFileRoute("/admin/leads")({
  component: () => <CrudView config={leadsConfig} />,
});
