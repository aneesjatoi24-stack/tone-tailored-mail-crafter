import { useServerFn } from "@tanstack/react-start";
import { Eraser, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateEmail } from "@/lib/ai.functions";
import { EMAIL_TYPES, LENGTHS, TONES } from "@/lib/site";
import { CopyButton } from "./CopyButton";

const selectCls =
  "h-11 w-full rounded-lg border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function EmailWriter() {
  const run = useServerFn(generateEmail);
  const [form, setForm] = useState({
    type: EMAIL_TYPES[0] as string,
    tone: TONES[0] as string,
    recipient: "",
    sender: "",
    points: "",
    length: "Medium",
  });
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    setLoading(true);
    setErr("");
    try {
      const r = await run({ data: form });
      if (r.ok) setOut(r.text);
      else setErr(r.error);
    } catch {
      setErr("We couldn't reach the writer. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="tool" className="grid gap-6 rounded-2xl border bg-card p-5 shadow-elevated md:grid-cols-2 md:p-8">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="type">Email type</Label>
            <select id="type" className={selectCls} value={form.type} onChange={set("type")}>
              {EMAIL_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tone">Tone</Label>
            <select id="tone" className={selectCls} value={form.tone} onChange={set("tone")}>
              {TONES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="recipient">Recipient name (optional)</Label>
            <Input id="recipient" className="h-11" placeholder="e.g. Ms. Carter" value={form.recipient} onChange={set("recipient")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sender">Your name (optional)</Label>
            <Input id="sender" className="h-11" placeholder="e.g. Alex Kim" value={form.sender} onChange={set("sender")} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="points">Key points</Label>
          <Textarea
            id="points"
            rows={5}
            maxLength={2000}
            placeholder="e.g. Applying for the junior marketing role I saw on LinkedIn, 2 years of social media experience, available to start in March."
            value={form.points}
            onChange={set("points")}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="length">Length</Label>
          <select id="length" className={selectCls} value={form.length} onChange={set("length")}>
            {LENGTHS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Writing..." : "Generate Email"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => {
              setForm({ ...form, recipient: "", sender: "", points: "" });
              setOut("");
              setErr("");
            }}
          >
            <Eraser className="h-4 w-4" /> Clear
          </Button>
        </div>
      </form>

      <div className="flex flex-col">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your email</h2>
          <div className="flex gap-2">
            <CopyButton text={out} />
            <Button type="button" variant="outline" size="sm" disabled={!out || loading} onClick={submit}>
              <RefreshCw className="h-4 w-4" /> Regenerate
            </Button>
          </div>
        </div>
        <div
          aria-live="polite"
          className="min-h-72 flex-1 whitespace-pre-wrap rounded-xl border bg-muted p-4 text-[0.95rem] leading-relaxed"
        >
          {loading && !out && <p className="text-muted-foreground">Writing your email…</p>}
          {err && <p role="alert" className="text-destructive">{err}</p>}
          {!loading && !out && !err && (
            <p className="text-muted-foreground">Fill in the details and press Generate Email. Your draft appears here.</p>
          )}
          {out && <span className={loading ? "opacity-50" : ""}>{out}</span>}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Review the email before sending. AI can make mistakes.</p>
      </div>
    </div>
  );
}
