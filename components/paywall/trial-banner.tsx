"use client";

import { Button } from "@/components/ui/button";

interface TrialBannerProps {
  daysLeft: number;
}

export function TrialBanner({ daysLeft }: TrialBannerProps) {
  if (daysLeft <= 0) return null;

  async function handleUpgrade() {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const { url } = await res.json();
    if (url) window.location.href = url;
  }

  return (
    <div className="flex items-center justify-between bg-accent/5 border border-accent/15 px-5 py-3 rounded-xl text-sm">
      <span className="text-muted-foreground">
        Seu trial termina em <strong className="text-foreground">{daysLeft} dia{daysLeft !== 1 ? "s" : ""}</strong>.
      </span>
      <Button
        size="sm"
        onClick={handleUpgrade}
        className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-5"
      >
        Assinar PRO
      </Button>
    </div>
  );
}
