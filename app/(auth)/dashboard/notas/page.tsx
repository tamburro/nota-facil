"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const statusLabels: Record<string, { label: string; className: string }> = {
  DRAFT: { label: "Rascunho", className: "text-muted-foreground bg-muted" },
  EMITIDA: { label: "Emitida", className: "text-accent bg-accent/10" },
  CANCELADA: { label: "Cancelada", className: "text-destructive bg-destructive/10" },
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight">Notas Fiscais</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium h-9 px-5 bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4" strokeWidth={1.5} />
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
              <Button type="submit" className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={createInvoice.isPending}>
                {createInvoice.isPending ? "Criando..." : "Criar Nota"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="divide-y divide-border/50">
        {invoices.map((inv: { id: string; descricao: string; valor: number; status: string; client: { nome: string } }) => {
          const st = statusLabels[inv.status] || statusLabels.DRAFT;
          return (
            <div key={inv.id} className="flex items-center justify-between py-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{inv.descricao}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{inv.client.nome}</p>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <span className={`font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded-full ${st.className}`}>
                  {st.label}
                </span>
                <span className="text-sm font-medium tabular-nums w-24 text-right">
                  {formatCurrency(inv.valor)}
                </span>
              </div>
            </div>
          );
        })}
        {invoices.length === 0 && (
          <p className="text-muted-foreground text-center py-12 text-sm">Nenhuma nota emitida.</p>
        )}
      </div>
    </div>
  );
}
