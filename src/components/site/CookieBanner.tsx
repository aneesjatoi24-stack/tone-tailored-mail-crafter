import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const KEY = "mc-cookie-consent";

function loadAnalytics() {
  if (!SITE.gaId || document.getElementById("ga-script")) return;
  const s = document.createElement("script");
  s.id = "ga-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`;
  document.head.appendChild(s);
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", SITE.gaId);
}

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const v = localStorage.getItem(KEY);
    if (!v) setShow(true);
    if (v === "accepted") loadAnalytics();
  }, []);
  if (!show) return null;
  const choose = (v: "accepted" | "declined") => {
    localStorage.setItem(KEY, v);
    setShow(false);
    if (v === "accepted") loadAnalytics();
  };
  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border bg-card p-4 shadow-elevated sm:flex sm:items-center sm:gap-4"
    >
      <p className="text-sm text-muted-foreground">
        We use cookies for analytics and, in future, advertising. You can accept or decline non-essential cookies.{" "}
        <Link to="/privacy-policy" className="font-medium text-primary underline">
          Learn more
        </Link>
      </p>
      <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
        <Button variant="outline" size="sm" onClick={() => choose("declined")}>
          Decline
        </Button>
        <Button size="sm" onClick={() => choose("accepted")}>
          Accept
        </Button>
      </div>
    </div>
  );
}
