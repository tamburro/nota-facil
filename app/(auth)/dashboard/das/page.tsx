"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaywallGate } from "@/components/paywall/paywall-gate";
import { PLAN_LIMITS } from "@/lib/subscription";

const statusColors: Record<string, string> = {
  PENDENTE: "secondary",
  PAGO: "default",
  VENCIDO: "destructive",
};

export default function DASPage() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user").then((r) => r.json()),
  });

  const hasAccess = user ? PLAN_LIMITS[user.plan as keyof typeof PLAN_LIMITS]?.dasAutomatico : false;

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">DAS — Documento de Arrecadação</h1>

      <PaywallGate hasAccess={hasAccess} feature="DAS Automático">
        <div className="grid gap-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Maio 2026</CardTitle>
                <Badge variant="secondary">PENDENTE</Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{formatCurrency(75.90)}</span>
              <span className="ml-2">• Vencimento: 20/06/2026</span>
            </CardContent>
          </Card>
          <p className="text-xs text-muted-foreground text-center">
            O DAS é calculado automaticamente com base no faturamento mensal.
          </p>
        </div>
      </PaywallGate>
    </div>
  );
}
