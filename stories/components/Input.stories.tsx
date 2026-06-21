import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta = {
  title: "Componentes/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "Nome ou razão social" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80 space-y-2">
      <Label>Cliente</Label>
      <Input {...args} />
    </div>
  ),
};

export const ComValor: Story = {
  name: "Com valor",
  render: () => (
    <div className="w-80 space-y-2">
      <Label>Valor (R$)</Label>
      <Input defaultValue="850,00" />
    </div>
  ),
};

export const Desabilitado: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label>CNPJ</Label>
      <Input disabled placeholder="00.000.000/0000-00" />
    </div>
  ),
};
