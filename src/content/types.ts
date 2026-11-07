export type Category = "Job Emails" | "Business Emails" | "Student Emails" | "Email Tips";

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "template"; title: string; subject: string; body: string };

export interface Article {
  slug: string;
  title: string; // H1
  seoTitle: string; // under 60 chars
  description: string; // under 155 chars
  category: Category;
  date: string; // YYYY-MM-DD
  readTime: number; // minutes
  excerpt: string;
  imageAlt: string;
  blocks: Block[];
  faq: { q: string; a: string }[];
  related: string[]; // 3 slugs
}
