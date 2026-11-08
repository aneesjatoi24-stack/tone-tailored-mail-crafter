import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Fragment } from "react";
import { ArticleCard } from "@/components/site/ArticleCard";
import { CopyButton } from "@/components/site/CopyButton";
import { AdSlot, seo } from "@/components/site/Page";
import { Button } from "@/components/ui/button";
import { formatDate, getArticle, imageFor, slugify } from "@/content/articles";
import type { Block } from "@/content/types";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const a = getArticle(params.slug);
    if (!a) throw notFound();
    return { slug: a.slug };
  },
  head: ({ params }) => {
    const a = getArticle(params.slug);
    if (!a) return { meta: [{ title: "Article not found | MailCraft AI" }, { name: "robots", content: "noindex" }] };
    const base = seo(a.seoTitle, a.description, `/blog/${a.slug}`, "article");
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.description,
            datePublished: a.date,
            author: { "@type": "Organization", name: "MailCraft AI Editorial Team" },
            publisher: { "@type": "Organization", name: SITE.name },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: a.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "h2":
      return <h2 id={slugify(b.text)}>{b.text}</h2>;
    case "h3":
      return <h3>{b.text}</h3>;
    case "p":
      return <p>{b.text}</p>;
    case "ul":
      return <ul>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>;
    case "ol":
      return <ol>{b.items.map((i) => <li key={i}>{i}</li>)}</ol>;
    case "template": {
      const full = `Subject: ${b.subject}\n\n${b.body}`;
      return (
        <figure className="not-prose my-6 rounded-xl border bg-primary-soft p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <figcaption className="font-semibold">{b.title}</figcaption>
            <CopyButton text={full} label="Copy template" />
          </div>
          <pre className="whitespace-pre-wrap font-sans text-[0.95rem] leading-relaxed">{full}</pre>
        </figure>
      );
    }
  }
}

function ArticlePage() {
  const { slug } = Route.useLoaderData();
  const a = getArticle(slug);
  if (!a) throw notFound();
  const toc = a.blocks.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
  const mid = Math.floor(a.blocks.length / 2);
  const related = a.related.map(getArticle).filter((x) => !!x);
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> /{" "}
        <span>{a.category}</span>
      </nav>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_280px]">
        <article>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">{a.category}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">{a.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            By MailCraft AI Editorial Team · <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.readTime} min read
          </p>
          <img src={imageFor(a)} alt={a.imageAlt} width={1200} height={688} className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" />
          <AdSlot />
          <details className="rounded-xl border bg-secondary p-4 lg:hidden" open>
            <summary className="cursor-pointer font-semibold">Table of contents</summary>
            <ol className="mt-2 space-y-1 text-sm">
              {toc.map((h) => <li key={h.text}><a href={`#${slugify(h.text)}`} className="text-primary">{h.text}</a></li>)}
            </ol>
          </details>
          <div className="prose-article">
            {a.blocks.map((b, i) => (
              <Fragment key={i}>
                {i === mid && <AdSlot />}
                <BlockView b={b} />
              </Fragment>
            ))}
            <h2 id="faq">Frequently asked questions</h2>
            {a.faq.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-primary p-6 text-primary-foreground">
            <h2 className="text-2xl font-bold">Need a draft right now?</h2>
            <p className="mt-1 opacity-90">Use the free MailCraft AI email writer and adjust the result in your own words.</p>
            <Button asChild variant="secondary" className="mt-4"><Link to="/">Open the email writer</Link></Button>
          </div>
          <AdSlot />
          <aside className="mt-8 flex gap-4 rounded-2xl border p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-soft font-bold text-primary">MC</span>
            <div>
              <p className="font-semibold">MailCraft AI Editorial Team</p>
              <p className="text-sm text-muted-foreground">
                We write practical, plain-English guides on workplace and academic email, tested against real situations our readers face.
              </p>
            </div>
          </aside>
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <nav aria-label="Table of contents" className="rounded-xl border p-4">
              <p className="font-semibold">On this page</p>
              <ol className="mt-2 space-y-2 text-sm">
                {toc.map((h) => <li key={h.text}><a href={`#${slugify(h.text)}`} className="text-muted-foreground hover:text-primary">{h.text}</a></li>)}
                <li><a href="#faq" className="text-muted-foreground hover:text-primary">FAQ</a></li>
              </ol>
            </nav>
            <div className="ad-slot min-h-64" aria-hidden="true">Advertisement</div>
          </div>
        </aside>
      </div>
      <section className="mt-14">
        <h2 className="text-2xl font-bold">Related articles</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">{related.map((r) => <ArticleCard key={r.slug} a={r} />)}</div>
      </section>
    </main>
  );
}
