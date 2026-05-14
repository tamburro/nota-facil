"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function ClientesPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetch("/api/clients").then((r) => r.json()),
  });

  const createClient = useMutation({
    mutationFn: (data: Record<string, string>) =>
      fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => {
        if (!r.ok) throw new Error("Erro ao criar cliente");
        return r.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Cliente criado");
      setOpen(false);
    },
    onError: () => toast.error("Erro ao criar cliente"),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createClient.mutate({
      nome: formData.get("nome") as string,
      cpfCnpj: formData.get("cpfCnpj") as string,
      email: formData.get("email") as string,
      endereco: formData.get("endereco") as string,
      tipo: formData.get("tipo") as string,
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight">Clientes</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium h-9 px-5 bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4" strokeWidth={1.5} />
            Novo Cliente
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Cliente</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Select name="tipo" defaultValue="PF">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PF">Pessoa Física</SelectItem>
                    <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input name="nome" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                <Input name="cpfCnpj" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input name="email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input name="endereco" />
              </div>
              <Button type="submit" className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={createClient.isPending}>
                {createClient.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="divide-y divide-border/50">
        {clients.map((client: { id: string; nome: string; cpfCnpj: string; tipo: string; email?: string }) => (
          <div key={client.id} className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium">{client.nome}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {client.cpfCnpj} {client.email && `· ${client.email}`}
              </p>
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              {client.tipo}
            </span>
          </div>
        ))}
        {clients.length === 0 && (
          <p className="text-muted-foreground text-center py-12 text-sm">Nenhum cliente cadastrado.</p>
        )}
      </div>
    </div>
  );
}
