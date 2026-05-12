"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrialBanner } from "@/components/paywall/trial-banner";
import { daysLeftInTrial } from "@/lib/subscription";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Painel</h1>
        {user && (
          <Badge variant={user.plan === "PRO" ? "default" : "secondary"}>
            {user.plan}
          </Badge>
        )}
      </div>

      {user?.plan === "TRIAL" && trialDays > 0 && <TrialBanner daysLeft={trialDays} />}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Notas Emitidas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{emitidas}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Pagas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent">{pagas}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-500">{pendentes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Faturado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalFaturado)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
