import jobImg from "@/assets/cat-job.jpg";
import businessImg from "@/assets/cat-business.jpg";
import studentImg from "@/assets/cat-student.jpg";
import tipsImg from "@/assets/cat-tips.jpg";
import professionalImg from "@/assets/article-professional-email.jpg";
import applicationImg from "@/assets/article-job-application.jpg";
import interviewImg from "@/assets/article-interview-follow-up.jpg";
import resignationImg from "@/assets/article-resignation.jpg";
import { batch1 } from "./articles/batch1";
import { batch2 } from "./articles/batch2";
import { batch3 } from "./articles/batch3";
import { batch4 } from "./articles/batch4";
import { batch5 } from "./articles/batch5";
import type { Article, Category } from "./types";

export const CATEGORIES: Category[] = ["Job Emails", "Business Emails", "Student Emails", "Email Tips"];

const IMAGES: Record<Category, string> = {
  "Job Emails": jobImg,
  "Business Emails": businessImg,
  "Student Emails": studentImg,
  "Email Tips": tipsImg,
};

export const ARTICLES: Article[] = [...batch1, ...batch2, ...batch3, ...batch4, ...batch5].sort((a, b) =>
  b.date.localeCompare(a.date),
);

const ARTICLE_IMAGES: Record<string, string> = {
  "how-to-write-a-professional-email": professionalImg,
  "job-application-email": applicationImg,
  "follow-up-email-after-interview": interviewImg,
  "resignation-email": resignationImg,
};

export const imageFor = (a: Article) => ARTICLE_IMAGES[a.slug] ?? IMAGES[a.category];
export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const POPULAR = ["how-to-write-a-professional-email", "job-application-email", "follow-up-email-after-interview"];

export const formatDate = (d: string) =>
  new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
