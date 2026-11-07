import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/Page";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms of Use | MailCraft AI", "The terms that apply when you use MailCraft AI and its free email writing tools.", "/terms"),
  component: () => (
    <PageShell title="Terms of Use">
      <p>By using MailCraft AI you agree to use the tools lawfully and not to abuse or overload the service. Generated emails must be reviewed by you before sending; you are responsible for what you send. The service is provided as is, without warranties, and may change at any time. Contact: {SITE.email}.</p>
    </PageShell>
  ),
});
