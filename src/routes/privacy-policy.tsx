import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/Page";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy-policy")({
  head: () => seo("Privacy Policy | MailCraft AI", "How MailCraft AI handles data, cookies, Google Analytics and AdSense, and your GDPR and CCPA rights.", "/privacy-policy"),
  component: () => (
    <PageShell title="Privacy Policy">
      <p>This policy explains what data MailCraft AI collects and how it is used.</p>
      <h2>Data we collect</h2><p>Text you enter into our tools is sent to our AI provider to produce a result and is not stored by us. If you accept cookies, Google Analytics collects anonymous usage data.</p>
      <h2>Cookies and advertising</h2><p>We may use Google AdSense. Google and its partners, including the DoubleClick DART cookie, may use cookies to show ads based on your visits to this and other sites. You can opt out of personalized ads at Google Ads Settings (adssettings.google.com) or aboutads.info.</p>
      <h2>Your rights (GDPR and CCPA)</h2><p>You may request access to, correction of, or deletion of your personal data, and you may opt out of the sale of personal data. We do not sell personal data.</p>
      <h2>Children</h2><p>Our service is not directed at children under 13.</p>
      <h2>Contact</h2><p>Email {SITE.email} with any privacy question.</p>
    </PageShell>
  ),
});
