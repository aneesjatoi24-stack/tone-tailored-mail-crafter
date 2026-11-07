import { Link } from "@tanstack/react-router";
import { formatDate, imageFor } from "@/content/articles";
import type { Article } from "@/content/types";

export function ArticleCard({ a }: { a: Article }) {
  return (
    <article className="group overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-0.5">
      <Link to="/blog/$slug" params={{ slug: a.slug }} className="block">
        <img src={imageFor(a)} alt={a.imageAlt} loading="lazy" width={1200} height={688} className="aspect-[16/9] w-full object-cover" />
        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{a.category}</p>
          <h3 className="mt-2 text-lg font-bold leading-snug group-hover:text-primary">{a.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{a.excerpt}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.readTime} min read
          </p>
        </div>
      </Link>
    </article>
  );
}
