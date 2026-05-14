"use client";

import { useQuery } from "@tanstack/react-query";
import { PaywallGate } from "@/components/paywall/paywall-gate";
import { PLAN_LIMITS } from "@/lib/subscription";

export default function DASPage() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user").then((r) => r.json()),
  });

  const hasAccess = user ? PLAN_LIMITS[user.plan as keyof typeof PLAN_LIMITS]?.dasAutomatico : false;

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  return (
    <div className="space-y-8">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight">
        DAS — Documento de Arrecadação
      </h1>

      <PaywallGate hasAccess={hasAccess} feature="DAS Automático">
        <div className="divide-y divide-border/50">
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium">Maio 2026</p>
              <p className="text-xs text-muted-foreground mt-0.5">Vencimento: 20/06/2026</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                Pendente
              </span>
              <span className="text-sm font-medium tabular-nums w-24 text-right">
                {formatCurrency(75.90)}
              </span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-6">
          O DAS é calculado automaticamente com base no faturamento mensal.
        </p>
      </PaywallGate>
    </div>
  );
}
