import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge, Mail, PenTool, Type } from "lucide-react";
import { seo } from "@/components/site/Page";

const TOOLS = [
  { to: "/", icon: Mail, t: "AI Email Writer", d: "Generate a complete email from a few key points in the tone you choose." },
  { to: "/tools/subject-line-generator", icon: Type, t: "Subject Line Generator", d: "Get 10 clear subject lines that tell the reader why to open." },
  { to: "/tools/tone-checker", icon: Gauge, t: "Email Tone Checker", d: "Paste a draft and see how it is likely to come across." },
  { to: "/tools/email-signature-generator", icon: PenTool, t: "Email Signature Generator", d: "Build a clean, professional signature to paste into Gmail or Outlook." },
] as const;

export const Route = createFileRoute("/tools/")({
  head: () => seo("Free Email Tools | MailCraft AI", "Free email tools: AI email writer, subject line generator, tone checker and email signature generator.", "/tools"),
  component: () => (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">Free Email Tools</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Small, focused tools that help you write, polish and sign off your emails.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {TOOLS.map((x) => (
          <Link key={x.to} to={x.to} className="rounded-2xl border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary">
            <x.icon className="h-7 w-7 text-primary" />
            <h2 className="mt-4 text-xl font-bold">{x.t}</h2>
            <p className="mt-1 text-muted-foreground">{x.d}</p>
          </Link>
        ))}
      </div>
    </main>
  ),
});
