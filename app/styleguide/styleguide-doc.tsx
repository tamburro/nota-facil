import {
  FileText,
  QrCode,
  Calculator,
  Check,
  ArrowRight,
  BarChart3,
  FileSpreadsheet,
  Bell,
  Users,
  CreditCard,
} from "lucide-react";

type Theme = "light" | "dark";

/* Tokens do tema claro aplicados via inline var (força claro mesmo sob html.dark).
   O escuro é forçado via className "dark" (usa os tokens .dark do globals.css). */
const lightVars = {
  "--background": "hsl(240 20% 99%)",
  "--foreground": "hsl(240 10% 12%)",
  "--card": "hsl(0 0% 100%)",
  "--card-foreground": "hsl(240 10% 12%)",
  "--popover": "hsl(0 0% 100%)",
  "--primary": "hsl(240 10% 12%)",
  "--primary-foreground": "hsl(0 0% 100%)",
  "--secondary": "hsl(240 6% 95%)",
  "--secondary-foreground": "hsl(240 8% 25%)",
  "--muted": "hsl(240 6% 96%)",
  "--muted-foreground": "hsl(240 4% 46%)",
  "--accent": "hsl(12 100% 67%)",
  "--accent-foreground": "hsl(0 0% 100%)",
  "--destructive": "hsl(0 75% 45%)",
  "--border": "hsl(240 6% 90%)",
  "--input": "hsl(240 6% 90%)",
  "--ring": "hsl(12 100% 67%)",
  "--coral": "hsl(12 100% 67%)",
  "--coral-soft": "hsl(16 100% 83%)",
  "--deep-green": "hsl(165 100% 12%)",
} as React.CSSProperties;

const uiLight = [
  { name: "Background", value: "hsl(240 20% 99%)", role: "Fundo base" },
  { name: "Card", value: "hsl(0 0% 100%)", role: "Superfícies" },
  { name: "Secondary", value: "hsl(240 6% 95%)", role: "Botão secundário" },
  { name: "Muted", value: "hsl(240 6% 96%)", role: "Áreas neutras" },
  { name: "Border", value: "hsl(240 6% 90%)", role: "Bordas / inputs" },
  { name: "Foreground", value: "hsl(240 10% 12%)", role: "Texto" },
  { name: "Muted Fg", value: "hsl(240 4% 46%)", role: "Texto secundário" },
  { name: "Destructive", value: "hsl(0 75% 45%)", role: "Erro / excluir" },
];

const uiDark = [
  { name: "Background", value: "hsl(240 14% 5%)", role: "Fundo base" },
  { name: "Card", value: "hsl(240 10% 8%)", role: "Superfícies" },
  { name: "Secondary", value: "hsl(240 7% 13%)", role: "Botão secundário" },
  { name: "Muted", value: "hsl(240 8% 11%)", role: "Áreas neutras" },
  { name: "Border", value: "hsl(240 6% 17%)", role: "Bordas / inputs" },
  { name: "Foreground", value: "hsl(240 6% 93%)", role: "Texto" },
  { name: "Muted Fg", value: "hsl(240 4% 60%)", role: "Texto secundário" },
  { name: "Destructive", value: "hsl(0 100% 35%)", role: "Erro / excluir" },
];

const principles = [
  { title: "Claro por padrão", desc: "O tema claro é o padrão, com escuro à disposição via toggle. Superfícies neutras dão protagonismo ao coral e ao conteúdo financeiro." },
  { title: "A língua do MEI", desc: "Nada de jargão de contador. Rótulos diretos — “Notas”, “Recebimentos”, “DAS” — que qualquer autônomo entende." },
  { title: "Faturar em 30 segundos", desc: "Fricção mínima. Fluxos curtos, formulários enxutos e ações primárias sempre evidentes." },
  { title: "Coral com propósito", desc: "O accent coral marca apenas o que importa: ação principal, status positivo, destaque. Usado com parcimônia, vira assinatura." },
];

const brandColors = [
  { name: "Coral", role: "Accent · ação primária", value: "#ff7759", text: "#ffffff" },
  { name: "Coral Soft", role: "Destaques suaves", value: "hsl(16 100% 83%)", text: "#17171c" },
  { name: "Deep Green", role: "Faixas de seção", value: "hsl(165 100% 12%)", text: "#ededf0" },
];

const chartColors = [
  { name: "Chart 1", value: "hsl(12 100% 67%)" },
  { name: "Chart 2", value: "hsl(16 100% 83%)" },
  { name: "Chart 3", value: "hsl(224 72% 60%)" },
  { name: "Chart 4", value: "hsl(216 74% 48%)" },
  { name: "Chart 5", value: "hsl(165 100% 12%)" },
];

const typeScale = [
  { name: "Display", size: "72px", use: "Hero", cls: "text-[4.5rem] leading-[1]" },
  { name: "Section", size: "48px", use: "Títulos de seção", cls: "text-5xl" },
  { name: "Card", size: "32px", use: "Títulos de card", cls: "text-[2rem]" },
  { name: "Feature", size: "24px", use: "Subtítulos", cls: "text-2xl" },
  { name: "Body L", size: "18px", use: "Lead", cls: "text-lg" },
  { name: "Body", size: "16px", use: "Corpo", cls: "text-base" },
  { name: "Caption", size: "14px", use: "Apoio", cls: "text-sm" },
];

const spacing = [
  { name: "xxs", value: "0.125rem", px: 2 },
  { name: "xs", value: "0.375rem", px: 6 },
  { name: "sm", value: "0.5rem", px: 8 },
  { name: "md", value: "0.75rem", px: 12 },
  { name: "lg", value: "1rem", px: 16 },
  { name: "xl", value: "1.5rem", px: 24 },
  { name: "2xl", value: "2rem", px: 32 },
  { name: "3xl", value: "3rem", px: 48 },
  { name: "section", value: "5rem", px: 80 },
];

const radii = [
  { name: "xs", value: "0.25rem", cls: "rounded-[0.25rem]" },
  { name: "sm", value: "0.5rem", cls: "rounded-[0.5rem]" },
  { name: "md", value: "1rem", cls: "rounded-[1rem]" },
  { name: "lg", value: "1.375rem", cls: "rounded-[1.375rem]" },
  { name: "xl", value: "1.875rem", cls: "rounded-[1.875rem]" },
  { name: "pill", value: "9999px", cls: "rounded-full" },
];

const statuses = [
  { label: "Emitida", cls: "text-accent bg-accent/10" },
  { label: "Paga", cls: "text-accent bg-accent/10" },
  { label: "Pendente", cls: "text-coral-soft bg-coral-soft/20" },
  { label: "Rascunho", cls: "text-muted-foreground bg-muted" },
  { label: "Vencida", cls: "text-destructive bg-destructive/10" },
  { label: "Cancelada", cls: "text-destructive bg-destructive/10" },
];

const icons = [
  { Icon: FileText, label: "Notas" },
  { Icon: QrCode, label: "Cobranças" },
  { Icon: BarChart3, label: "Recebimentos" },
  { Icon: Calculator, label: "DAS" },
  { Icon: FileSpreadsheet, label: "DASN" },
  { Icon: Users, label: "Clientes" },
  { Icon: CreditCard, label: "Assinatura" },
  { Icon: Bell, label: "Alertas" },
];

const motion = [
  { title: "Entrada coreografada", desc: "Elementos do hero entram em sequência (fade + translateY) com stagger via GSAP." },
  { title: "Reveal on scroll", desc: "Cards e seções surgem ao entrar no viewport, com ScrollTrigger." },
  { title: "Nota 3D viva", desc: "Documento em Three.js com curvatura côncava de papel, bob suave e leve mouse-follow." },
  { title: "prefers-reduced-motion", desc: "Movimento é desligado e a nota fica estática quando o usuário pede menos animação." },
];

const toc = ["Princípios", "Marca", "Cores", "Tipografia", "Espaçamento", "Raio", "Elevação", "Botões", "Status", "Cards", "Formulários", "Iconografia", "Movimento", "Voz & Tom"];

function Section({ n, label, title, desc, children }: { n: string; label: string; title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-accent">{n}</span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{label}</span>
      </div>
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">{desc}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function StyleguideDoc({ theme }: { theme: Theme }) {
  const isDark = theme === "dark";
  const ui = isDark ? uiDark : uiLight;
  const shadowCard = isDark ? "shadow-xl shadow-black/40" : "shadow-lg shadow-black/[0.07]";
  const shadowRaised = isDark ? "shadow-lg shadow-black/30" : "shadow-md shadow-black/5";
  const shadowFloat = isDark ? "shadow-xl shadow-black/40" : "shadow-lg shadow-black/[0.08]";

  return (
    <div
      style={isDark ? undefined : lightVars}
      className={`${isDark ? "dark " : ""}min-h-screen bg-background text-foreground`}
    >
      <div className="container mx-auto max-w-5xl px-6 py-20 space-y-24">
        {/* Capa */}
        <header className="border-b border-border pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
            Design System · {isDark ? "Tema escuro" : "Tema claro"} · v1.0
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-7xl font-medium tracking-[-0.03em] leading-[0.95]">Nota Fácil</h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Linguagem visual de um emissor de NFS-e para o MEI. Coral vibrante, verde-profundo e tipografia geométrica — feito para faturar sem parecer software de contador.
          </p>
          <nav className="mt-12 flex flex-wrap gap-x-6 gap-y-2">
            {toc.map((item, i) => (
              <span key={item} className="font-mono text-xs text-muted-foreground">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> {item}
              </span>
            ))}
          </nav>
        </header>

        {/* 01 Princípios */}
        <Section n="01" label="Fundamentos" title="Princípios" desc="Quatro decisões que orientam cada tela do produto.">
          <div className="grid gap-px sm:grid-cols-2 bg-border rounded-xl overflow-hidden">
            {principles.map((p) => (
              <div key={p.title} className="bg-background p-6">
                <h3 className="text-lg font-medium mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 02 Marca */}
        <Section n="02" label="Identidade" title="Marca" desc="O wordmark usa Space Grotesk Medium. O símbolo é a nota com a faixa coral.">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-8 flex flex-col items-center justify-center gap-4 min-h-44">
              <div className="flex h-12 w-10 flex-col overflow-hidden rounded-md bg-[#f5f5f0] shadow-sm">
                <div className="h-3 w-full bg-accent" />
              </div>
              <span className="font-[family-name:var(--font-display)] text-xl font-medium">Nota Fácil</span>
            </div>
            <div className="rounded-xl border border-border bg-deep-green p-8 flex items-center justify-center min-h-44">
              <span className="font-[family-name:var(--font-display)] text-xl font-medium text-white">Nota Fácil</span>
            </div>
            <div className="rounded-xl border border-border bg-accent p-8 flex items-center justify-center min-h-44">
              <span className="font-[family-name:var(--font-display)] text-xl font-medium text-accent-foreground">Nota Fácil</span>
            </div>
          </div>
        </Section>

        {/* 03 Cores */}
        <Section n="03" label="Cores" title="Paleta" desc="Marca em primeiro plano, interface neutra e uma série dedicada a gráficos.">
          <p className="text-sm font-medium text-muted-foreground mb-4">Marca</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {brandColors.map((c) => (
              <div key={c.name} className="rounded-xl border border-border overflow-hidden">
                <div className="h-32 flex items-end p-4" style={{ backgroundColor: c.value, color: c.text }}>
                  <span className="text-sm font-medium">{c.name}</span>
                </div>
                <div className="px-4 py-3">
                  <p className="font-mono text-xs text-foreground">{c.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{c.role}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm font-medium text-muted-foreground mb-4">Interface ({isDark ? "escuro" : "claro"})</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {ui.map((c) => (
              <div key={c.name} className="rounded-xl border border-border p-4">
                <div className="h-14 w-full rounded-lg border border-border mb-3" style={{ backgroundColor: c.value }} />
                <p className="text-sm font-medium">{c.name}</p>
                <p className="font-mono text-xs text-muted-foreground mt-0.5">{c.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.role}</p>
              </div>
            ))}
          </div>

          <p className="text-sm font-medium text-muted-foreground mb-4">Gráficos</p>
          <div className="flex flex-wrap gap-4">
            {chartColors.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg border border-border" style={{ backgroundColor: c.value }} />
                <div>
                  <p className="text-sm font-medium leading-tight">{c.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 04 Tipografia */}
        <Section n="04" label="Tipografia" title="Escala & famílias" desc="Space Grotesk para títulos, Inter para texto e JetBrains Mono para labels e dados.">
          <div className="divide-y divide-border border-y border-border">
            {typeScale.map((t) => (
              <div key={t.name} className="grid grid-cols-12 items-baseline gap-4 py-5">
                <span className={`col-span-7 truncate font-[family-name:var(--font-display)] font-medium tracking-tight ${t.cls}`}>Nota Fácil</span>
                <span className="col-span-2 font-mono text-xs text-muted-foreground">{t.size}</span>
                <span className="col-span-3 text-right text-xs text-muted-foreground">{t.use}</span>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Space Grotesk · Display</p>
              <p className="font-[family-name:var(--font-display)] text-3xl">Aa</p>
              <p className="font-[family-name:var(--font-display)] text-sm mt-2">ABCDEFG abcdefg 0123</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Inter · Texto</p>
              <p className="text-3xl">Aa</p>
              <p className="text-sm mt-2">ABCDEFG abcdefg 0123</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">JetBrains Mono · Dados</p>
              <p className="font-mono text-3xl">Aa</p>
              <p className="font-mono text-sm mt-2">ABCDEFG abcdefg 0123</p>
            </div>
          </div>
        </Section>

        {/* 05 Espaçamento */}
        <Section n="05" label="Layout" title="Espaçamento" desc="Escala base para padding, gaps e margens.">
          <div className="space-y-3">
            {spacing.map((s) => (
              <div key={s.name} className="flex items-center gap-4">
                <span className="w-20 font-mono text-xs text-muted-foreground">{s.name}</span>
                <div className="h-4 rounded bg-accent/80" style={{ width: s.px }} />
                <span className="font-mono text-xs text-muted-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* 06 Raio */}
        <Section n="06" label="Layout" title="Raio de borda" desc="Cantos suaves em cards (md/lg) e formas pílula para ações e chips.">
          <div className="flex flex-wrap gap-6">
            {radii.map((r) => (
              <div key={r.name} className="text-center">
                <div className={`h-20 w-20 border border-accent/50 bg-card ${r.cls}`} />
                <p className="mt-3 text-sm font-medium">{r.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{r.value}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 07 Elevação */}
        <Section n="07" label="Layout" title="Elevação" desc="Profundidade vem de sombras suaves e bordas leves.">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm font-medium">Flat</p>
              <p className="text-xs text-muted-foreground mt-1">Borda 1px · sem sombra</p>
            </div>
            <div className={`rounded-xl border border-border bg-card p-6 ${shadowRaised}`}>
              <p className="text-sm font-medium">Raised</p>
              <p className="text-xs text-muted-foreground mt-1">Card · elevação média</p>
            </div>
            <div className={`rounded-xl border border-border bg-card p-6 ${shadowFloat}`}>
              <p className="text-sm font-medium">Floating</p>
              <p className="text-xs text-muted-foreground mt-1">Glass · elevação alta</p>
            </div>
          </div>
        </Section>

        {/* 08 Botões */}
        <Section n="08" label="Componentes" title="Botões" desc="Pílula coral para a ação primária; variações neutras para o resto.">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-6 h-11 text-sm font-medium">
              Começar grátis <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button className="rounded-full border border-border px-6 h-11 text-sm font-medium hover:bg-secondary">Ver preços</button>
            <button className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 h-11 text-sm font-medium">Secundário</button>
            <button className="rounded-full px-6 h-11 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary">Ghost</button>
            <button className="rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 px-6 h-11 text-sm font-medium">Excluir</button>
            <button disabled className="rounded-full bg-accent text-accent-foreground px-6 h-11 text-sm font-medium opacity-50">Desabilitado</button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button className="rounded-full bg-accent text-accent-foreground px-4 h-9 text-xs font-medium">Pequeno</button>
            <button className="rounded-full bg-accent text-accent-foreground px-6 h-11 text-sm font-medium">Padrão</button>
            <button className="rounded-full bg-accent text-accent-foreground px-8 h-12 text-base font-medium">Grande</button>
          </div>
        </Section>

        {/* 09 Status */}
        <Section n="09" label="Componentes" title="Status & Badges" desc="Chips em mono uppercase comunicam o estado de notas, cobranças e plano.">
          <div className="flex flex-wrap items-center gap-3">
            {statuses.map((s) => (
              <span key={s.label} className={`font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded-full ${s.cls}`}>{s.label}</span>
            ))}
            <span className="font-mono text-xs uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">PRO</span>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground bg-muted px-3 py-1 rounded-full">FREE</span>
          </div>
        </Section>

        {/* 10 Cards */}
        <Section n="10" label="Componentes" title="Cards" desc="Métrica do painel, notificação flutuante e plano de assinatura.">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-sm text-muted-foreground">Notas Emitidas</span>
              </div>
              <p className="text-3xl font-[family-name:var(--font-display)] font-medium tracking-tight">128</p>
            </div>
            <div className={`rounded-xl border border-border bg-card p-5 flex items-center gap-3 ${shadowCard}`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Pix recebido</p>
                <p className="text-sm font-medium">R$ 850,00</p>
              </div>
            </div>
            <div className="rounded-2xl border border-accent/40 bg-card p-6 relative">
              <span className="absolute -top-3 left-6 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">Popular</span>
              <h3 className="text-lg font-medium mb-1">PRO</h3>
              <p className="text-3xl font-[family-name:var(--font-display)] font-medium tracking-tight">
                R$ 29<span className="text-base text-muted-foreground font-normal ml-1">/mês</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                <li className="flex items-center gap-2"><span className="text-accent">✓</span> Notas ilimitadas</li>
                <li className="flex items-center gap-2"><span className="text-accent">✓</span> Cobranças Pix</li>
                <li className="flex items-center gap-2"><span className="text-accent">✓</span> DAS automático</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* 11 Formulários */}
        <Section n="11" label="Componentes" title="Formulários" desc="Inputs com borda neutra; foco em coral (ring).">
          <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cliente</label>
              <input placeholder="Nome ou razão social" className="w-full rounded-lg border border-input bg-card px-3 h-10 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Valor (R$)</label>
              <input defaultValue="850,00" className="w-full rounded-lg border border-ring ring-2 ring-ring/30 bg-card px-3 h-10 text-sm focus:outline-none" />
              <p className="text-xs text-muted-foreground">Estado: foco</p>
            </div>
          </div>
        </Section>

        {/* 12 Iconografia */}
        <Section n="12" label="Componentes" title="Iconografia" desc="lucide-react, traço 1.5, sempre com rótulo no produto.">
          <div className="flex flex-wrap gap-5">
            {icons.map(({ Icon, label }) => (
              <div key={label} className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card text-foreground">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 13 Movimento */}
        <Section n="13" label="Interação" title="Movimento" desc="GSAP para entradas e scroll; Three.js para a nota fiscal 3D do hero.">
          <div className="grid gap-px sm:grid-cols-2 bg-border rounded-xl overflow-hidden">
            {motion.map((m) => (
              <div key={m.title} className="bg-background p-6">
                <h3 className="text-sm font-medium mb-1.5">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 14 Voz & Tom */}
        <Section n="14" label="Conteúdo" title="Voz & Tom" desc="Português direto, sem juridiquês. Frases curtas, verbos no imperativo.">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-accent/40 bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-accent mb-3">Fazemos</p>
              <ul className="space-y-2 text-sm">
                <li>“Emita nota, controle recebimento.”</li>
                <li>“Faturar sem virar contador.”</li>
                <li>“Cobrança Pix em 3 cliques.”</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Evitamos</p>
              <ul className="space-y-2 text-sm text-muted-foreground line-through decoration-destructive/60">
                <li>“Emissão de documento fiscal eletrônico de serviço.”</li>
                <li>“Apuração de tributos do Simples Nacional.”</li>
                <li>“Geração de cobrança instantânea via arranjo Pix.”</li>
              </ul>
            </div>
          </div>
        </Section>

        <footer className="border-t border-border pt-8">
          <p className="font-mono text-xs text-muted-foreground">
            Nota Fácil · Design System ({isDark ? "tema escuro" : "tema claro"}) · 2026 — Space Grotesk / Inter / JetBrains Mono · lucide-react · Tailwind
          </p>
        </footer>
      </div>
    </div>
  );
}
