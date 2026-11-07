import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/Page";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact | MailCraft AI", "Get in touch with the MailCraft AI team. We usually reply within 2 business days.", "/contact"),
  component: () => (
    <PageShell title="Contact">
      <p>Email us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We usually reply within 2 business days.</p>
    </PageShell>
  ),
});
