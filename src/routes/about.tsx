import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/Page";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => seo("About | MailCraft AI", "Why MailCraft AI exists, who it helps and how the free AI email writer works.", "/about"),
  component: () => (
    <PageShell title="About">
      <p>MailCraft AI is a free AI email writer for students and working professionals. We built it because writing a clear, polite email for a job application, a leave request or a complaint often takes far longer than it should.</p>
      <h2>How it works</h2>
      <p>You choose the email type, tone and length, add a few key points, and the tool writes a draft. You review it, edit it in your own words, and send it. We do not store the emails you generate.</p>
      <h2>Our commitment</h2>
      <p>We aim to be honest and useful: no fake reviews, no inflated claims. AI drafts can contain mistakes, so always read them before sending. Questions? Email {SITE.email}.</p>
    </PageShell>
  ),
});
