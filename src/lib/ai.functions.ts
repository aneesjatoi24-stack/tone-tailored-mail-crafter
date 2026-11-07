import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { EMAIL_TYPES, LENGTHS, TONES } from "./site";

type Result = { ok: true; text: string } | { ok: false; error: string };

function clientKey() {
  const req = getRequest();
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "anon"
  );
}

async function guarded(fn: () => Promise<string>): Promise<Result> {
  const { AiError, checkRateLimit } = await import("./ai.server");
  try {
    checkRateLimit(clientKey());
    return { ok: true, text: await fn() };
  } catch (e) {
    return { ok: false, error: e instanceof AiError ? e.message : "Something went wrong. Please try again." };
  }
}

const clip = (s: unknown, n: number) => (typeof s === "string" ? s.slice(0, n) : "");

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((d: { type: string; tone: string; recipient?: string; sender?: string; points: string; length: string }) => {
    if (!EMAIL_TYPES.includes(d.type as never)) throw new Error("Invalid email type");
    if (!TONES.includes(d.tone as never)) throw new Error("Invalid tone");
    if (!LENGTHS.includes(d.length as never)) throw new Error("Invalid length");
    return { ...d, recipient: clip(d.recipient, 80), sender: clip(d.sender, 80), points: clip(d.points, 2000) };
  })
  .handler(async ({ data }) =>
    guarded(async () => {
      const { runPrompt } = await import("./ai.server");
      const words = { Short: "80-120", Medium: "150-220", Detailed: "250-350" }[data.length];
      return runPrompt(
        "You are an expert professional email writer for students and professionals in the US and UK. Write in natural American English. Output ONLY the email in this exact format:\nSubject: <subject line>\n\n<email body with greeting and sign-off>\nNo markdown, no commentary. Never invent facts beyond the user's points; use [brackets] for missing specifics.",
        `Email type: ${data.type}\nTone: ${data.tone}\nLength: ${words} words\nRecipient name: ${data.recipient || "(not given — use an appropriate generic greeting)"}\nSender name: ${data.sender || "(not given — use [Your Name])"}\nKey points:\n${data.points || "(none given — write a sensible standard version)"}`,
      );
    }),
  );

export const generateSubjects = createServerFn({ method: "POST" })
  .inputValidator((d: { topic: string; tone: string }) => ({ topic: clip(d.topic, 600), tone: clip(d.tone, 30) }))
  .handler(async ({ data }) =>
    guarded(async () => {
      const { runPrompt } = await import("./ai.server");
      return runPrompt(
        "You write clear, honest email subject lines. Return exactly 10 subject lines, one per line, no numbering, no quotes, no clickbait, each under 60 characters.",
        `Email is about: ${data.topic}\nTone: ${data.tone}`,
      );
    }),
  );

export const checkTone = createServerFn({ method: "POST" })
  .inputValidator((d: { email: string }) => ({ email: clip(d.email, 4000) }))
  .handler(async ({ data }) =>
    guarded(async () => {
      const { runPrompt } = await import("./ai.server");
      return runPrompt(
        "You are an email tone coach. Analyze the email and reply in plain text with these sections, each on its own line starting with the label:\nOverall tone: <2-4 words>\nHow it reads: <2 sentences>\nStrengths: <bulleted with '- '>\nSuggestions: <bulleted with '- ', concrete rewrites of specific phrases>\nNo markdown headings or bold.",
        data.email,
      );
    }),
  );
