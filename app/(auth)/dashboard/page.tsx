"use client";

import { useQuery } from "@tanstack/react-query";
import { TrialBanner } from "@/components/paywall/trial-banner";
import { daysLeftInTrial } from "@/lib/subscription";
import { FileText, CircleCheck, Clock, DollarSign } from "lucide-react";

export default function DashboardPage() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user").then((r) => r.json()),
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => fetch("/api/invoices").then((r) => r.json()),
  });

  const emitidas = invoices.filter((i: { status: string }) => i.status === "EMITIDA").length;
  const pagas = invoices.filter((i: { cobranca?: { status: string } }) => i.cobranca?.status === "PAGA").length;
  const pendentes = invoices.filter((i: { cobranca?: { status: string } }) => i.cobranca?.status === "PENDENTE").length;
  const totalFaturado = invoices
    .filter((i: { status: string }) => i.status === "EMITIDA")
    .reduce((sum: number, i: { valor: number }) => sum + i.valor, 0);

  const trialDays = user ? daysLeftInTrial(user) : 0;

  const metrics = [
    { label: "Notas Emitidas", value: emitidas, icon: FileText, color: "text-foreground" },
    { label: "Pagas", value: pagas, icon: CircleCheck, color: "text-accent" },
    { label: "Pendentes", value: pendentes, icon: Clock, color: "text-amber-700 dark:text-coral-soft" },
    {
      label: "Total Faturado",
      value: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalFaturado),
      icon: DollarSign,
      color: "text-foreground",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight">
          Painel
        </h1>
        {user && (
          <span className="font-mono text-xs uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
            {user.plan}
          </span>
        )}
      </div>

      {user?.plan === "TRIAL" && trialDays > 0 && <TrialBanner daysLeft={trialDays} />}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-border/60 p-5">
            <div className="flex items-center gap-2 mb-3">
              <m.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-sm text-muted-foreground">{m.label}</span>
            </div>
            <p className={`text-3xl font-[family-name:var(--font-display)] font-medium tracking-tight ${m.color}`}>
              {m.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
