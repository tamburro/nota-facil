import type { Meta, StoryObj } from "@storybook/react";

const scale = [
  { name: "Display", cls: "text-[4.5rem] leading-[1]", size: "72px", use: "Hero" },
  { name: "Section", cls: "text-5xl", size: "48px", use: "Títulos de seção" },
  { name: "Card", cls: "text-[2rem]", size: "32px", use: "Títulos de card" },
  { name: "Feature", cls: "text-2xl", size: "24px", use: "Subtítulos" },
  { name: "Body L", cls: "text-lg", size: "18px", use: "Lead" },
  { name: "Body", cls: "text-base", size: "16px", use: "Corpo" },
  { name: "Caption", cls: "text-sm", size: "14px", use: "Apoio" },
];

function Type() {
  return (
    <div className="max-w-4xl space-y-12">
      <div className="divide-y divide-border/40 border-y border-border/40">
        {scale.map((t) => (
          <div key={t.name} className="grid grid-cols-12 items-baseline gap-4 py-5">
            <span className={`col-span-7 truncate font-[family-name:var(--font-display)] font-medium tracking-tight ${t.cls}`}>
              Nota Fácil
            </span>
            <span className="col-span-2 font-mono text-xs text-muted-foreground">{t.size}</span>
            <span className="col-span-3 text-right text-xs text-muted-foreground">{t.use}</span>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Space Grotesk · Display
          </p>
          <p className="font-[family-name:var(--font-display)] text-3xl">Aa</p>
          <p className="font-[family-name:var(--font-display)] text-sm mt-2">ABCDEFG abcdefg 0123</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Inter · Texto
          </p>
          <p className="text-3xl">Aa</p>
          <p className="text-sm mt-2">ABCDEFG abcdefg 0123</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
            JetBrains Mono · Dados
          </p>
          <p className="font-mono text-3xl">Aa</p>
          <p className="font-mono text-sm mt-2">ABCDEFG abcdefg 0123</p>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Fundamentos/Tipografia",
  component: Type,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Type>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Escala: Story = {};
