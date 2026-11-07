import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Footer() {
  const links = [
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms of Use" },
    { to: "/disclaimer", label: "Disclaimer" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/sitemap", label: "Sitemap" },
  ] as const;
  return (
    <footer className="mt-20 border-t bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-extrabold">
              MailCraft <span className="text-primary">AI</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              A free AI email writer and practical email guides for students and professionals.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="text-muted-foreground hover:text-primary">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
