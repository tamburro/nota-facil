import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Check } from "lucide-react";

const meta = {
  title: "Componentes/Card",
  component: Card,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Plano PRO</CardTitle>
        <CardDescription>Tudo ilimitado para o seu MEI.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-[family-name:var(--font-display)] font-medium tracking-tight">
          R$ 29
          <span className="text-base text-muted-foreground font-normal ml-1">/mês</span>
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full rounded-full">Testar 14 dias grátis</Button>
      </CardFooter>
    </Card>
  ),
};

export const PadroesDoProduto: Story = {
  name: "Padrões do produto",
  render: () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
      {/* Métrica */}
      <div className="rounded-xl border border-border/60 p-5">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-sm text-muted-foreground">Notas Emitidas</span>
        </div>
        <p className="text-3xl font-[family-name:var(--font-display)] font-medium tracking-tight">
          128
        </p>
      </div>

      {/* Notificação flutuante */}
      <div className="rounded-xl border border-border/60 bg-card/80 p-5 flex items-center gap-3 shadow-xl shadow-black/40 backdrop-blur">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <div>
          <p className="text-xs text-muted-foreground">Pix recebido</p>
          <p className="text-sm font-medium">R$ 850,00</p>
        </div>
      </div>

      {/* Preço destaque */}
      <div className="rounded-2xl border border-accent/40 bg-card p-6 relative">
        <span className="absolute -top-3 left-6 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
          Popular
        </span>
        <h3 className="text-lg font-medium mb-1">PRO</h3>
        <p className="text-3xl font-[family-name:var(--font-display)] font-medium tracking-tight">
          R$ 29
          <span className="text-base text-muted-foreground font-normal ml-1">/mês</span>
        </p>
      </div>
    </div>
  ),
};
