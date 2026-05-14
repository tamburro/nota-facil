"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-8 max-w-lg">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight">Assinatura</h1>

      <div className="rounded-xl border border-border/60 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Seu plano</span>
          {user && (
            <span className="font-mono text-xs uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
              {user.plan}
            </span>
          )}
        </div>

        {user?.plan === "PRO" ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plano PRO ativo. Próxima cobrança:{" "}
              <span className="text-foreground">
                {user.stripeCurrentPeriodEnd &&
                  new Date(user.stripeCurrentPeriodEnd).toLocaleDateString("pt-BR")}
              </span>
            </p>
            <Button variant="outline" onClick={handlePortal} className="rounded-full">
              Gerenciar assinatura
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {user?.plan === "TRIAL"
                ? "Você está no período de teste gratuito."
                : "Você está no plano gratuito com limite de 5 notas/mês."}
            </p>
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 space-y-4">
              <div>
                <p className="font-[family-name:var(--font-display)] text-lg font-medium tracking-tight">
                  Plano PRO
                </p>
                <p className="text-2xl font-[family-name:var(--font-display)] font-medium tracking-tight mt-1">
                  R$ 29<span className="text-sm text-muted-foreground font-normal ml-1">/mês</span>
                </p>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> Notas ilimitadas
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> Cobranças Pix com QR Code
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> DAS automático
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> DASN-SIMEI automático
                </li>
              </ul>
              <Button
                onClick={handleCheckout}
                className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Assinar PRO
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
