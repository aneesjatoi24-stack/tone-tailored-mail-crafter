// Replace these values before going live.
export const SITE = {
  name: "MailCraft AI",
  tagline: "Write Professional Emails in Seconds",
  email: "contact@yourdomain.com",
  url: "https://yourdomain.com",
  // Paste your Google Analytics 4 measurement ID (e.g. "G-XXXXXXX") to enable analytics after cookie consent.
  gaId: "",
  // Paste your Google Search Console verification code (the content value only).
  searchConsoleVerification: "",
};

export const EMAIL_TYPES = [
  "Job application",
  "Follow-up after interview",
  "Resignation",
  "Leave request",
  "Thank you",
  "Complaint",
  "Business proposal",
  "Cold outreach",
  "Apology",
  "Meeting request",
  "Payment reminder",
  "Reference request",
] as const;

export const TONES = ["Formal", "Friendly", "Persuasive", "Polite", "Confident"] as const;
export const LENGTHS = ["Short", "Medium", "Detailed"] as const;
