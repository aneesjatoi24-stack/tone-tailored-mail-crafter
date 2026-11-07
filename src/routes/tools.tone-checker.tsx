import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Gauge, Loader2 } from "lucide-react";
import { useState } from "react";
import { PageShell, seo } from "@/components/site/Page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { checkTone } from "@/lib/ai.functions";

export const Route = createFileRoute("/tools/tone-checker")({
  head: () => seo("Free Email Tone Checker | MailCraft AI", "Paste your email and get instant feedback on how it sounds, plus suggestions to make it clearer and kinder.", "/tools/tone-checker"),
  component: Page,
});

function Page() {
  const run = useServerFn(checkTone);
  const [email, setEmail] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const go = async () => {
    if (email.trim().length < 20) return setErr("Paste a little more of your email so we can judge the tone.");
    setLoading(true);
    setErr("");
    try {
      const r = await run({ data: { email } });
      if (r.ok) setOut(r.text);
      else setErr(r.error);
    } catch {
      setErr("We couldn't reach the tone checker. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageShell title="Email Tone Checker" intro="Paste your draft and find out how it is likely to come across before you hit send.">
      <div className="not-prose space-y-4 rounded-2xl border bg-card p-5 shadow-card">
        <div className="space-y-1.5">
          <Label htmlFor="email">Your email</Label>
          <Textarea id="email" rows={8} maxLength={4000} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Paste your email here..." />
        </div>
        <Button onClick={go} disabled={loading}>{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gauge className="h-4 w-4" />} Check tone</Button>
        {err && <p role="alert" className="text-destructive">{err}</p>}
        {out && <div aria-live="polite" className="whitespace-pre-wrap rounded-xl border bg-muted p-4 leading-relaxed">{out}</div>}
        <p className="text-xs text-muted-foreground">Feedback is a suggestion, not a verdict. You know your reader best.</p>
      </div>

      <h2>Why tone is so easy to get wrong in email</h2>
      <p>In a face-to-face conversation, your voice, expression and timing do a lot of the work. In email, the reader only has your words, and they fill in the rest with their own mood and assumptions. A short "Fine, thanks." that felt efficient when you typed it can read as cold or annoyed. A long, apologetic message can read as unsure of itself. A tone checker gives you a second opinion before the email leaves your outbox.</p>
      <h2>What the checker looks at</h2>
      <p>The tool reads your draft and describes its overall tone in a few words, explains how a typical reader might react, points out what is working, and suggests specific phrases you could change. It pays attention to things like how direct your requests are, whether you sound defensive or blaming, how much hedging language you use ("just," "sorry to bother," "I was wondering if maybe"), and whether the opening and closing match the relationship you have with the reader.</p>
      <h3>How to get the most useful feedback</h3>
      <ul>
        <li>Paste the full email, including the greeting and sign-off, since these set much of the tone.</li>
        <li>Check emails that matter most: complaints, requests for money or time, replies to criticism, and messages to senior people.</li>
        <li>Treat suggestions as options. If a change does not sound like you, keep your version.</li>
        <li>Run the check again after editing to see if the tone moved in the direction you wanted.</li>
      </ul>
      <h2>Common tone problems and quick fixes</h2>
      <p>If your email sounds too blunt, add a short line of context and a softer request: "Could you send the report by Friday? I need it for Monday's client call." If it sounds too timid, cut the apologies and state what you need plainly. If it sounds passive-aggressive, remove phrases such as "as I said before" or "per my last email" and simply restate the point. If it sounds too casual for the reader, swap slang and emojis for complete sentences and a proper greeting.</p>
      <p>Want to start from a well-toned draft instead? Try the <Link to="/">free AI email writer</Link> or read <Link to="/blog/$slug" params={{ slug: "formal-vs-informal-email" }}>formal vs informal email: when to use which</Link>.</p>
    </PageShell>
  );
}
