"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="border-accent/30">
      <CardHeader>
        <CardTitle className="text-lg">
          {feature ? `${feature} é PRO` : "Recurso PRO"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Faça upgrade para o plano PRO por R$ 29/mês e desbloqueie todos os recursos.
        </p>
        <Button onClick={handleUpgrade} className="bg-accent text-accent-foreground hover:bg-accent/90">
          Fazer upgrade
        </Button>
      </CardContent>
    </Card>
  );
}
