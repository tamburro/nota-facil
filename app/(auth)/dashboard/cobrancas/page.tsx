"use client";

import { useQuery } from "@tanstack/react-query";
import { PaywallGate } from "@/components/paywall/paywall-gate";
import { PLAN_LIMITS } from "@/lib/subscription";

const statusLabels: Record<string, { label: string; className: string }> = {
  PENDENTE: { label: "Pendente", className: "text-muted-foreground bg-muted" },
  PAGA: { label: "Paga", className: "text-accent bg-accent/10" },
  EXPIRADA: { label: "Expirada", className: "text-destructive bg-destructive/10" },
  CANCELADA: { label: "Cancelada", className: "text-destructive bg-destructive/10" },
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
    <div className="space-y-8">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight">Cobranças Pix</h1>

      <PaywallGate hasAccess={hasAccess} feature="Cobranças Pix">
        <div className="divide-y divide-border/50">
          {cobrancas.map((c: { id: string; descricao: string; clienteNome: string; valor: number; status: string }) => {
            const st = statusLabels[c.status] || statusLabels.PENDENTE;
            return (
              <div key={c.id} className="flex items-center justify-between py-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{c.descricao}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.clienteNome}</p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <span className={`font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded-full ${st.className}`}>
                    {st.label}
                  </span>
                  <span className="text-sm font-medium tabular-nums w-24 text-right">
                    {formatCurrency(c.valor)}
                  </span>
                </div>
              </div>
            );
          })}
          {cobrancas.length === 0 && (
            <p className="text-muted-foreground text-center py-12 text-sm">Nenhuma cobrança gerada.</p>
          )}
        </div>
      </PaywallGate>
    </div>
  );
}
