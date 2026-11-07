import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CopyButton } from "@/components/site/CopyButton";
import { PageShell, seo } from "@/components/site/Page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/tools/email-signature-generator")({
  head: () => seo("Free Email Signature Generator | MailCraft AI", "Create a clean, professional email signature for Gmail or Outlook in seconds. Free, no sign-up, nothing stored.", "/tools/email-signature-generator"),
  component: Page,
});

const FIELDS = [
  ["name", "Full name", "Jordan Lee"],
  ["title", "Job title", "Marketing Coordinator"],
  ["company", "Company or school", "Brightline Studio"],
  ["phone", "Phone", "+1 555 010 2030"],
  ["email", "Email", "jordan@brightline.com"],
  ["website", "Website or LinkedIn", "linkedin.com/in/jordanlee"],
] as const;

type Key = (typeof FIELDS)[number][0];

function Page() {
  const [v, setV] = useState<Record<Key, string>>({ name: "", title: "", company: "", phone: "", email: "", website: "" });
  const val = (k: Key) => v[k] || FIELDS.find((f) => f[0] === k)![2];
  const plain = [val("name"), [val("title"), val("company")].filter(Boolean).join(" | "), [val("phone"), val("email")].join(" · "), val("website")].join("\n");
  return (
    <PageShell title="Email Signature Generator" intro="Fill in your details, preview the result, and copy a tidy signature into your email app.">
      <div className="not-prose grid gap-6 rounded-2xl border bg-card p-5 shadow-card md:grid-cols-2">
        <div className="space-y-3">
          {FIELDS.map(([k, label, ph]) => (
            <div key={k} className="space-y-1">
              <Label htmlFor={k}>{label}</Label>
              <Input id={k} placeholder={ph} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} />
            </div>
          ))}
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Preview</p>
          <div className="rounded-xl border bg-background p-5">
            <div className="border-l-4 border-primary pl-4">
              <p className="text-lg font-bold">{val("name")}</p>
              <p className="text-sm text-muted-foreground">{val("title")} · {val("company")}</p>
              <p className="mt-2 text-sm">{val("phone")}</p>
              <p className="text-sm text-primary">{val("email")}</p>
              <p className="text-sm text-primary">{val("website")}</p>
            </div>
          </div>
          <div className="mt-3"><CopyButton text={plain} label="Copy signature" /></div>
          <p className="mt-2 text-xs text-muted-foreground">Nothing you type here is sent or saved.</p>
        </div>
      </div>

      <h2>What a professional email signature should include</h2>
      <p>An email signature is a small business card at the bottom of every message. Its job is to tell the reader who you are and how to reach you, without making them scroll through clutter. For most people, that means your full name, your job title, your company or school, one phone number, and one link such as your website or LinkedIn profile. Your email address is optional, since the reader already has it, but many people include it so the signature still works when an email is forwarded.</p>
      <h2>Keep it short and readable</h2>
      <p>Four or five lines is usually enough. Long signatures with several phone numbers, inspirational quotes, large logos and a row of social icons make every email feel heavier and can trigger spam filters. Images are also often blocked by default in email apps, so a signature built only from an image can show up as an empty box. A plain text signature like the one this tool produces loads instantly and looks the same everywhere.</p>
      <h3>How to add your signature</h3>
      <ul>
        <li><strong>Gmail:</strong> open Settings, choose See all settings, scroll to Signature, create a new one, paste, and save changes at the bottom of the page.</li>
        <li><strong>Outlook:</strong> open Settings, go to Mail and then Compose and reply, paste into the signature box, and save.</li>
        <li><strong>Apple Mail:</strong> open Settings, choose Signatures, select your account, add a new signature and paste.</li>
      </ul>
      <h2>Signatures for students and job seekers</h2>
      <p>If you are a student, use your degree and university in place of a job title, for example "BSc Computer Science, University of Leeds, Class of 2027." Job seekers can add a short professional headline, such as "Marketing graduate | Content and social media," and a link to an online portfolio. Avoid personal details like your home address or date of birth.</p>
      <p>Once your signature is ready, draft the rest with the <Link to="/">free AI email writer</Link>, or learn <Link to="/blog/$slug" params={{ slug: "how-to-end-an-email" }}>the best ways to end an email</Link>.</p>
    </PageShell>
  );
}
