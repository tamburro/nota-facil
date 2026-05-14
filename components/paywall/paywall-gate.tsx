"use client";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface PaywallGateProps {
  children: React.ReactNode;
  hasAccess: boolean;
  feature?: string;
}

export function PaywallGate({ children, hasAccess, feature }: PaywallGateProps) {
  if (hasAccess) return <>{children}</>;

  async function handleUpgrade() {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const { url } = await res.json();
    if (url) window.location.href = url;
  }

  return (
    <div className="rounded-xl border border-border/60 p-8 text-center max-w-md mx-auto mt-12">
      <Lock className="h-6 w-6 text-muted-foreground mx-auto mb-4" strokeWidth={1.5} />
      <h3 className="font-[family-name:var(--font-display)] text-lg font-medium tracking-tight mb-2">
        {feature ? `${feature} é PRO` : "Recurso PRO"}
      </h3>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        Faça upgrade para o plano PRO por R$ 29/mês e desbloqueie todos os recursos.
      </p>
      <Button
        onClick={handleUpgrade}
        className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8"
      >
        Fazer upgrade
      </Button>
    </div>
  );
}
