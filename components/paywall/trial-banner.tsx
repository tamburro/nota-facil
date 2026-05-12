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
    <div className="flex items-center justify-between bg-accent/10 border border-accent/20 px-4 py-2 rounded-lg text-sm">
      <span>
        Seu trial termina em <strong>{daysLeft} dia{daysLeft !== 1 ? "s" : ""}</strong>.
      </span>
      <Button size="sm" onClick={handleUpgrade} className="bg-accent text-accent-foreground hover:bg-accent/90">
        Assinar PRO
      </Button>
    </div>
  );
}
