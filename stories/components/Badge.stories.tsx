import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Componentes/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
  args: { children: "PRO", variant: "default" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

const statuses: [string, string][] = [
  ["Emitida", "text-accent bg-accent/10"],
  ["Paga", "text-accent bg-accent/10"],
  ["Pendente", "text-coral-soft bg-coral-soft/10"],
  ["Rascunho", "text-muted-foreground bg-muted"],
  ["Vencida", "text-destructive bg-destructive/10"],
  ["Cancelada", "text-destructive bg-destructive/10"],
];

export const Status: Story = {
  name: "Status (notas e cobranças)",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {statuses.map(([label, cls]) => (
        <span
          key={label}
          className={`font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded-full ${cls}`}
        >
          {label}
        </span>
      ))}
    </div>
  ),
};
