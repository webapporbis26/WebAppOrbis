import { createFileRoute } from "@tanstack/react-router";
import { CrudView } from "@/components/admin/CrudView";
import { dealsConfig } from "@/lib/admin/schemas";

export const Route = createFileRoute("/admin/deals")({
  component: () => <CrudView config={dealsConfig} />,
});
