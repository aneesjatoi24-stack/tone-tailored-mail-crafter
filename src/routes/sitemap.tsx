import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/Page";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/sitemap")({
  head: () => seo("Sitemap | MailCraft AI", "A list of every page on MailCraft AI.", "/sitemap"),
  component: () => (
    <PageShell title="Sitemap">
      <ul>{["/","/tools","/blog","/about","/contact","/privacy-policy","/terms","/disclaimer"].map((p) => <li key={p}><a href={p}>{p}</a></li>)}</ul>
    </PageShell>
  ),
});
