import { createFileRoute } from "@tanstack/react-router";
import { CrudView } from "@/components/admin/CrudView";
import { renewalsConfig } from "@/lib/admin/schemas";

export const Route = createFileRoute("/admin/renewals")({
  component: () => <CrudView config={renewalsConfig} />,
});
