import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { CopyButton } from "@/components/site/CopyButton";
import { PageShell, seo } from "@/components/site/Page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateSubjects } from "@/lib/ai.functions";
import { TONES } from "@/lib/site";

export const Route = createFileRoute("/tools/subject-line-generator")({
  head: () => seo("Free Email Subject Line Generator | MailCraft AI", "Describe your email and get 10 clear, honest subject lines that get opened. Free, no sign-up.", "/tools/subject-line-generator"),
  component: Page,
});

function Page() {
  const run = useServerFn(generateSubjects);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<string>("Formal");
  const [lines, setLines] = useState<string[]>([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const go = async () => {
    if (!topic.trim()) return setErr("Tell us what your email is about first.");
    setLoading(true);
    setErr("");
    try {
      const r = await run({ data: { topic, tone } });
      if (r.ok) setLines(r.text.split("\n").map((l) => l.replace(/^[-\d.)\s]+/, "").trim()).filter(Boolean));
      else setErr(r.error);
    } catch {
      setErr("We couldn't reach the generator. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageShell title="Email Subject Line Generator" intro="Describe your email in a sentence and get ten subject lines to choose from.">
      <div className="not-prose space-y-4 rounded-2xl border bg-card p-5 shadow-card">
        <div className="space-y-1.5">
          <Label htmlFor="topic">What is your email about?</Label>
          <Textarea id="topic" rows={3} maxLength={600} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Following up on my application for the data analyst role, interviewed last Tuesday" />
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="tone">Tone</Label>
            <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)} className="h-10 rounded-lg border border-input bg-background px-3">
              {TONES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <Button onClick={go} disabled={loading}>{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} Generate subject lines</Button>
        </div>
        {err && <p role="alert" className="text-destructive">{err}</p>}
        {lines.length > 0 && (
          <ul className="divide-y rounded-xl border" aria-live="polite">
            {lines.map((l) => (
              <li key={l} className="flex items-center justify-between gap-3 p-3"><span>{l}</span><CopyButton text={l} /></li>
            ))}
          </ul>
        )}
      </div>

      <h2>Why your subject line matters</h2>
      <p>The subject line is the first, and sometimes the only, part of your email that a busy person reads. A recruiter scanning fifty applications, a professor checking messages between classes, or a client sorting a crowded inbox all decide in a second or two whether your email gets opened now, later, or never. A good subject line does not need to be clever. It needs to tell the reader what the email is and why it is relevant to them.</p>
      <h2>What makes a subject line work</h2>
      <p>Strong subject lines tend to share a few traits. They are specific: "Interview follow-up: Data Analyst role, Tuesday 14 May" beats "Following up." They are short enough to show on a phone, usually under about 50 characters. They front-load the important words, because email apps cut off the end. And they are honest. A subject that promises something the email does not deliver may get one open, but it damages trust for every email you send after it.</p>
      <h3>How to use this generator</h3>
      <ol>
        <li>Describe the purpose of your email in one or two sentences, including any key detail like a job title, date or order number.</li>
        <li>Pick a tone. Formal suits applications and official requests, while Friendly works for colleagues and people you already know.</li>
        <li>Generate, then pick the line that fits best. Edit it so it sounds like you and includes any specifics the reader will search for later.</li>
      </ol>
      <h2>Tips for different situations</h2>
      <p>For job emails, include the role title and your name so the message is easy to find: "Application: Junior Designer – Priya Shah." For follow-ups, reference the earlier conversation so the reader can place you instantly. For requests, state the request directly: "Request: 2 days of leave, 3–4 June." For sales or cold outreach, focus on the reader's benefit rather than your product, and avoid all caps, excessive punctuation and words like "free!!!" that look like spam.</p>
      <p>If you are still drafting the email itself, try the <Link to="/">free AI email writer</Link>, or read our guide to <Link to="/blog/$slug" params={{ slug: "email-subject-lines-that-get-opened" }}>50 email subject lines that get opened</Link> for more examples.</p>
    </PageShell>
  );
}
