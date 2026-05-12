"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaywallGate } from "@/components/paywall/paywall-gate";
import { PLAN_LIMITS } from "@/lib/subscription";

const statusColors: Record<string, string> = {
  PENDENTE: "secondary",
  PAGA: "default",
  EXPIRADA: "destructive",
  CANCELADA: "destructive",
};

export default function CobrancasPage() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user").then((r) => r.json()),
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => fetch("/api/invoices").then((r) => r.json()),
  });

  const cobrancas = invoices
    .filter((i: { cobranca?: object }) => i.cobranca)
    .map((i: { cobranca: object; descricao: string; client: { nome: string } }) => ({
      ...i.cobranca,
      descricao: i.descricao,
      clienteNome: i.client.nome,
    }));

  const hasAccess = user ? PLAN_LIMITS[user.plan as keyof typeof PLAN_LIMITS]?.pixCobrancas : false;

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cobranças Pix</h1>

      <PaywallGate hasAccess={hasAccess} feature="Cobranças Pix">
        <div className="grid gap-3">
          {cobrancas.map((c: { id: string; descricao: string; clienteNome: string; valor: number; status: string }) => (
            <Card key={c.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{c.descricao}</CardTitle>
                  <Badge variant={statusColors[c.status] as "default" | "secondary" | "destructive"}>
                    {c.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{c.clienteNome}</span>
                <span className="font-medium text-foreground">{formatCurrency(c.valor)}</span>
              </CardContent>
            </Card>
          ))}
          {cobrancas.length === 0 && (
            <p className="text-muted-foreground text-center py-8">Nenhuma cobrança gerada.</p>
          )}
        </div>
      </PaywallGate>
    </div>
  );
}
