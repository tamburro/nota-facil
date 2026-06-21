import type { Meta, StoryObj } from "@storybook/react";

const brand = [
  { name: "Coral (accent)", value: "#ff7759", text: "#ffffff", role: "Ação primária" },
  { name: "Coral Soft", value: "hsl(16 100% 83%)", text: "#17171c", role: "Destaques suaves" },
  { name: "Deep Green", value: "hsl(165 100% 12%)", text: "#ededf0", role: "Faixas de seção" },
];

const ui = [
  { name: "Background", value: "hsl(240 14% 5%)", role: "Fundo base" },
  { name: "Card", value: "hsl(240 10% 8%)", role: "Superfícies" },
  { name: "Secondary", value: "hsl(240 7% 13%)", role: "Botão secundário" },
  { name: "Muted", value: "hsl(240 8% 11%)", role: "Áreas neutras" },
  { name: "Border", value: "hsl(240 6% 17%)", role: "Bordas / inputs" },
  { name: "Foreground", value: "hsl(240 6% 93%)", role: "Texto" },
  { name: "Muted Fg", value: "hsl(240 4% 60%)", role: "Texto secundário" },
  { name: "Destructive", value: "hsl(0 100% 35%)", role: "Erro / excluir" },
];

const charts = [
  { name: "Chart 1", value: "hsl(12 100% 67%)" },
  { name: "Chart 2", value: "hsl(16 100% 83%)" },
  { name: "Chart 3", value: "hsl(224 72% 60%)" },
  { name: "Chart 4", value: "hsl(216 74% 48%)" },
  { name: "Chart 5", value: "hsl(165 100% 12%)" },
];

function Swatches() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
          Marca
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {brand.map((c) => (
            <div key={c.name} className="rounded-xl border border-border/60 overflow-hidden">
              <div className="h-28 flex items-end p-4" style={{ backgroundColor: c.value, color: c.text }}>
                <span className="text-sm font-medium">{c.name}</span>
              </div>
              <div className="px-4 py-3">
                <p className="font-mono text-xs text-foreground">{c.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
          Interface
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ui.map((c) => (
            <div key={c.name} className="rounded-xl border border-border/60 p-4">
              <div className="h-14 w-full rounded-lg border border-border/40 mb-3" style={{ backgroundColor: c.value }} />
              <p className="text-sm font-medium">{c.name}</p>
              <p className="font-mono text-xs text-muted-foreground mt-0.5">{c.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
          Gráficos
        </p>
        <div className="flex flex-wrap gap-4">
          {charts.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg border border-border/40" style={{ backgroundColor: c.value }} />
              <div>
                <p className="text-sm font-medium leading-tight">{c.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Fundamentos/Cores",
  component: Swatches,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Swatches>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paleta: Story = {};
