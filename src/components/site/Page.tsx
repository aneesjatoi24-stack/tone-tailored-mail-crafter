import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/** Empty reserved space where Google AdSense units can be placed later. */
export function AdSlot({ label = "Advertisement" }: { label?: string }) {
  return <div className="ad-slot my-8" aria-hidden="true">{label}</div>;
}

export function PageShell({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> / <span>{title}</span>
      </nav>
      <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
      {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
      <div className="prose-article mt-6">{children}</div>
    </main>
  );
}

export function seo(title: string, description: string, path: string, type = "website") {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
