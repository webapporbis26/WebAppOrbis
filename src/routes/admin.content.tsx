import { createFileRoute } from "@tanstack/react-router";
import { CrudView } from "@/components/admin/CrudView";
import { contentConfig } from "@/lib/admin/schemas";

export const Route = createFileRoute("/admin/content")({
  component: () => <CrudView config={contentConfig} />,
});
