import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArticleCard } from "@/components/site/ArticleCard";
import { AdSlot, seo } from "@/components/site/Page";
import { ARTICLES, CATEGORIES } from "@/content/articles";
import type { Category } from "@/content/types";

export const Route = createFileRoute("/blog/")({
  head: () => seo("Email Writing Blog: Guides & Templates | MailCraft AI", "Practical guides and ready-to-use email templates for job seekers, students and professionals.", "/blog"),
  component: Blog,
});

function Blog() {
  const [cat, setCat] = useState<Category | "All">("All");
  const list = cat === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === cat);
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">Email Writing Blog</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        Clear, practical guides with templates you can copy and adapt today.
      </p>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <AdSlot />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => <ArticleCard key={a.slug} a={a} />)}
      </div>
    </main>
  );
}
