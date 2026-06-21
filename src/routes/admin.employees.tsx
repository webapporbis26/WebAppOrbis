import { createFileRoute } from "@tanstack/react-router";
import { CrudView } from "@/components/admin/CrudView";
import { employeesConfig } from "@/lib/admin/schemas";

export const Route = createFileRoute("/admin/employees")({
  component: () => <CrudView config={employeesConfig} />,
});
