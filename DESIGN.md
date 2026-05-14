---
version: 1.0
name: Nota Fácil Design System
description: Dark-first SaaS design system inspired by Cohere's editorial restraint. Near-black backgrounds, coral accent, deep-green feature bands, pill CTAs, flat surfaces, monumental display typography with tight tracking.

colors:
  background: "#0c0c11"
  foreground: "#ededf0"
  card: "#151519"
  primary: "#17171c"
  primary-foreground: "#ffffff"
  secondary: "#1e1e24"
  muted: "#1a1a20"
  muted-foreground: "#93939f"
  accent: "#ff7759"
  accent-foreground: "#ffffff"
  coral: "#ff7759"
  coral-soft: "#ffad9b"
  deep-green: "#003c33"
  border: "#28282f"
  destructive: "#b30000"

typography:
  display:
    fontFamily: Space Grotesk
    fallback: Inter, system-ui, sans-serif
  body:
    fontFamily: Inter
    fallback: system-ui, sans-serif
  mono:
    fontFamily: JetBrains Mono
    fallback: monospace

rounded:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 22px
  xl: 30px
  pill: 9999px
---

## Princípios

- **Dark-first**: tema escuro é o padrão, sem toggle light/dark.
- **Flat**: sem drop shadows. Depth vem de bordas sutis e alternância de superfícies.
- **Editorial**: whitespace generoso, tipografia monumental, conteúdo respira.
- **Restrained color**: coral (#ff7759) como único accent quente. UI em tons neutros escuros.
- **Pill CTAs**: botões primários sempre `rounded-full`.

## Cores

- **Background** (`#0c0c11`): fundo principal, quase preto com tom azulado.
- **Card** (`#151519`): superfície elevada para cards e dialogs.
- **Accent/Coral** (`#ff7759`): CTAs, badges ativos, ring de foco, links de ação.
- **Coral Soft** (`#ffad9b`): ícones em seções escuras, estados hover leves.
- **Deep Green** (`#003c33`): seção de features na landing (banda escura estilo Cohere).
- **Muted** (`#93939f`): texto secundário, metadados, labels de baixa prioridade.
- **Border** (`#28282f`): divisores, bordas de cards (usar com /50 ou /60 para suavizar).

## Tipografia

- **Display** (Space Grotesk): títulos de página, hero, preços. Weight 500, tracking tight (-0.03em).
- **Body** (Inter): texto corrido, labels, botões. Weight 400-500.
- **Mono** (JetBrains Mono): badges de status, labels técnicos (TRIAL, PRO, PF/PJ). Sempre uppercase + tracking wider.

## Componentes

### Botões
- Primário: `rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8`
- Outline: `rounded-full border-border/60`
- Ghost: texto puro, sem background

### Cards de Métrica
- `rounded-xl border border-border/60 p-5`
- Ícone + label em `text-muted-foreground`
- Valor em `font-display text-3xl font-medium tracking-tight`

### Listas (clientes, notas, cobranças)
- `divide-y divide-border/50` — linhas separadas por regras finas
- Sem cards individuais — estilo editorial com rows limpos
- Status badges: `font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded-full`

### Trial Banner
- `bg-accent/5 border border-accent/15 rounded-xl`
- CTA pill à direita

### Paywall Gate
- Centralizado, ícone Lock, texto explicativo, CTA pill coral

### Sidebar
- Background mais escuro que a página (`sidebar` token)
- Ícones Lucide com `strokeWidth={1.5}`
- Item ativo: `bg-sidebar-accent`
- Logo em font-display, sem bold excessivo

## Do's and Don'ts

### Do
- Usar `font-[family-name:var(--font-display)]` para headings
- Usar `font-mono text-xs uppercase tracking-wider` para badges/status
- Manter bordas em `/50` ou `/60` para suavidade
- Usar `rounded-full` em todos os CTAs
- Deep green apenas para seções de destaque na landing

### Don't
- Não usar sombras em cards
- Não usar cores saturadas como fundo de seção (exceto deep-green na landing)
- Não misturar rounded-md com rounded-full em botões — CTAs sempre pill
- Não usar bold/800 — o sistema prefere medium/500 com tamanho e tracking
