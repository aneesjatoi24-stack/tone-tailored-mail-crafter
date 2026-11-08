import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const GATEWAY = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

export class AiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

/** Streams a single prompt through Lovable AI and returns the final text. */
export async function runPrompt(instructions: string, prompt: string): Promise<string> {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) throw new AiError("The AI service is not configured yet.", 500);

  let runId: string | undefined;
  const provider = createOpenAI({
    baseURL: GATEWAY,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      const headers = new Headers(init?.headers);
      if (runId) headers.set("X-Lovable-AIG-Run-ID", runId);
      const res = await fetch(input, { ...init, headers });
      runId ??= res.headers.get("X-Lovable-AIG-Run-ID") ?? undefined;
      return res;
    },
  });

  let failure: unknown;
  const result = streamText({
    model: provider.responses(MODEL),
    system: instructions,
    prompt,
    onError: ({ error }) => {
      failure = error;
    },
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  let text = "";
  try {
    text = await result.text;
  } catch (e) {
    failure ??= e;
  }
  if (failure || !text.trim()) {
    const status = (failure as { statusCode?: number })?.statusCode ?? 500;
    if (status === 429) throw new AiError("Too many requests right now. Please try again in a minute.", 429);
    if (status === 402 || status === 403)
      throw new AiError("The AI writer is temporarily unavailable. Please try again later.", status);
    throw new AiError("Something went wrong while writing. Please try again.", status);
  }
  return cleanText(text);
}

/** Strips markdown code fences, backticks and stray formatting so output is clean plain text. */
export function cleanText(raw: string): string {
  let text = raw.trim();
  // Remove fenced code blocks, keeping their inner content (```markdown ... ``` or ``` ... ```)
  text = text.replace(/```[a-zA-Z]*\s*\n?([\s\S]*?)```/g, "$1");
  // Remove inline backticks
  text = text.replace(/`([^`]*)`/g, "$1");
  // Remove leftover bold/italic markers
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
  // Remove markdown headings (## Heading -> Heading)
  text = text.replace(/^#{1,6}\s+/gm, "");
  return text.trim();
}

// Simple in-memory rate limit: 10 requests per minute per visitor.
const hits = new Map<string, number[]>();
export function checkRateLimit(key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (list.length >= limit) throw new AiError("You're going a bit fast. Please wait a minute and try again.", 429);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
}
