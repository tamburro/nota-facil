"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user").then((r) => r.json()),
  });

  async function handleCheckout() {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const { url } = await res.json();
    if (url) window.location.href = url;
  }

  async function handlePortal() {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const { url } = await res.json();
    if (url) window.location.href = url;
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold">Assinatura</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Seu plano</CardTitle>
            {user && <Badge>{user.plan}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {user?.plan === "PRO" ? (
            <>
              <p className="text-sm text-muted-foreground">
                Plano PRO ativo. Próxima cobrança:{" "}
                {user.stripeCurrentPeriodEnd &&
                  new Date(user.stripeCurrentPeriodEnd).toLocaleDateString("pt-BR")}
              </p>
              <Button variant="outline" onClick={handlePortal}>
                Gerenciar assinatura
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                {user?.plan === "TRIAL"
                  ? "Você está no período de teste gratuito."
                  : "Você está no plano gratuito com limite de 5 notas/mês."}
              </p>
              <div className="rounded-lg border border-accent/30 p-4 space-y-2">
                <p className="font-semibold text-accent">Plano PRO — R$ 29/mês</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Notas ilimitadas</li>
                  <li>• Cobranças Pix com QR Code</li>
                  <li>• DAS automático</li>
                  <li>• DASN-SIMEI automático</li>
                </ul>
                <Button onClick={handleCheckout} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Assinar PRO
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
