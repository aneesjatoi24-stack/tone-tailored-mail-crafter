import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, PenLine, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { ArticleCard } from "@/components/site/ArticleCard";
import { EmailWriter } from "@/components/site/EmailWriter";
import { seo } from "@/components/site/Page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getArticle, POPULAR } from "@/content/articles";
import { SITE } from "@/lib/site";

const FAQ = [
  { q: "Is MailCraft AI really free?", a: "Yes. You can write emails without an account or payment. A light usage limit keeps the service fast for everyone." },
  { q: "Do you store the emails I write?", a: "No. Your inputs are sent to the AI service to write the draft and are not saved in a database or shown to other visitors." },
  { q: "Can I send the email exactly as written?", a: "Always read it first. Check names, dates and facts, and adjust anything that does not sound like you." },
  { q: "Which kinds of emails can it write?", a: "Job applications, interview follow-ups, resignations, leave requests, thank you notes, complaints, proposals, cold outreach, apologies, meeting requests, payment reminders and reference requests." },
  { q: "Does it work on my phone?", a: "Yes. The tool works in any modern mobile or desktop browser, and the Copy button puts the draft straight into your email app." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo("MailCraft AI: Free AI Email Writer Tool", "Write professional emails in seconds. Free AI email writer for job applications, follow-ups, resignations, complaints and more.", "/"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          email: SITE.email,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const popular = POPULAR.map(getArticle).filter((a) => !!a);
  return (
    <main>
      <section className="bg-gradient-to-b from-primary-soft to-background">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-14 text-center md:pt-20">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-sm font-medium text-primary shadow-card">
            <Sparkles className="h-4 w-4" /> Free · No sign-up
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Write Professional Emails in <span className="text-primary">Seconds</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Pick the email type and tone, add a few key points, and get a clear, polished draft you can send with confidence.
          </p>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <EmailWriter />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold tracking-tight">How it works</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: PenLine, t: "Choose the basics", d: "Select the email type, tone and length you need." },
            { icon: Sparkles, t: "Add key points", d: "Tell the writer what the email must say in a sentence or two." },
            { icon: CheckCircle2, t: "Review and send", d: "Read the draft, tweak details, copy it and send." },
          ].map((s, i) => (
            <li key={s.t} className="rounded-2xl border bg-card p-6 shadow-card">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><s.icon className="h-5 w-5" /></span>
              <p className="mt-4 text-sm font-semibold text-primary">Step {i + 1}</p>
              <h3 className="text-lg font-bold">{s.t}</h3>
              <p className="mt-1 text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight">Why people use MailCraft AI</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Clock, t: "Saves time", d: "Skip the blank page and start from a solid draft." },
              { icon: PenLine, t: "Right tone", d: "Formal, friendly, persuasive, polite or confident." },
              { icon: Wallet, t: "Free to use", d: "No account, no card, no trial countdown." },
              { icon: ShieldCheck, t: "Private", d: "We don't store the emails you generate." },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border bg-card p-6 shadow-card">
                <b.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 text-lg font-bold">{b.t}</h3>
                <p className="mt-1 text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold tracking-tight">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-8">
          {FAQ.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Popular guides</h2>
          <Link to="/blog" className="font-medium text-primary">All articles →</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {popular.map((a) => <ArticleCard key={a.slug} a={a} />)}
        </div>
      </section>
    </main>
  );
}
