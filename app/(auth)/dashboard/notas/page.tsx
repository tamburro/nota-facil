"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  DRAFT: "secondary",
  EMITIDA: "default",
  CANCELADA: "destructive",
};

export default function NotasPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: invoices = [] } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => fetch("/api/invoices").then((r) => r.json()),
  });

  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetch("/api/clients").then((r) => r.json()),
  });

  const createInvoice = useMutation({
    mutationFn: (data: { clientId: string; descricao: string; valor: number }) =>
      fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => {
        if (!r.ok) return r.json().then((d) => Promise.reject(d));
        return r.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Nota criada");
      setOpen(false);
    },
    onError: (err: { error?: string }) => toast.error(err.error || "Erro ao criar nota"),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createInvoice.mutate({
      clientId: formData.get("clientId") as string,
      descricao: formData.get("descricao") as string,
      valor: parseFloat(formData.get("valor") as string),
    });
  }

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notas Fiscais</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Nova Nota
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Nota Fiscal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Cliente</Label>
                <Select name="clientId" required>
                  <SelectTrigger><SelectValue placeholder="Selecione um cliente" /></SelectTrigger>
                  <SelectContent>
                    {clients.map((c: { id: string; nome: string }) => (
                      <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Descrição do serviço</Label>
                <Textarea name="descricao" required />
              </div>
              <div className="space-y-2">
                <Label>Valor (R$)</Label>
                <Input name="valor" type="number" step="0.01" min="0.01" required />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={createInvoice.isPending}>
                {createInvoice.isPending ? "Criando..." : "Criar Nota"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {invoices.map((inv: { id: string; descricao: string; valor: number; status: string; client: { nome: string }; emitidaAt?: string }) => (
          <Card key={inv.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{inv.descricao}</CardTitle>
                <Badge variant={statusColors[inv.status] as "default" | "secondary" | "destructive"}>
                  {inv.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{inv.client.nome}</span>
              <span className="font-medium text-foreground">{formatCurrency(inv.valor)}</span>
            </CardContent>
          </Card>
        ))}
        {invoices.length === 0 && (
          <p className="text-muted-foreground text-center py-8">Nenhuma nota emitida.</p>
        )}
      </div>
    </div>
  );
}
