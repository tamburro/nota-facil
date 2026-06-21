@AGENTS.md

# Nota Fácil

## Convenções

- Respostas e UI em português (PT-BR)
- Dark-first: tema escuro é o padrão. Toggle light/dark via `next-themes` (`attribute="class"`, `defaultTheme="dark"`). Tokens dark em `.dark`, light em `:root` (globals.css)
- Cores via tokens Tailwind semânticos (`bg-primary`, `text-accent`), nunca hex hardcoded
- Validação com Zod v4 (`zod/v4`)
- Auth.js v5 (beta) com variáveis `AUTH_*` (não NEXTAUTH_*)
- Middleware leve: checa cookie direto, nunca importa Auth.js (limite 1MB Edge)
- Stripe SDK v20+: `current_period_end` vem via `invoice.period_end`
- Prisma ^6 (não v7)

## Comandos

- `npm run dev` — dev server
- `npm run tokens` — gera CSS a partir de `design-system/tokens.ts`
- `npm run db:push` — aplica schema ao banco
- `npm run db:studio` — abre Prisma Studio

## Planos

- FREE: 5 notas/mês, sem Pix, sem DAS
- TRIAL (14 dias): tudo ilimitado
- PRO (R$29/mês): tudo ilimitado

## Estrutura de rotas

- `(public)` — rotas públicas (login)
- `(auth)` — rotas protegidas (dashboard, settings)
- `api/` — route handlers
