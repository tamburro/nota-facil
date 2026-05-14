import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, QrCode, BarChart3, Calculator, FileSpreadsheet } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Emissor de NFS-e",
    description: "Integração nacional. Emita em 3 cliques com cliente e serviço salvos.",
  },
  {
    icon: QrCode,
    title: "Cobranças Pix",
    description: "QR Code vinculado à nota com confirmação automática de pagamento.",
  },
  {
    icon: BarChart3,
    title: "Controle de Recebimentos",
    description: "Notas emitidas, pagas, pendentes e vencidas com alertas.",
  },
  {
    icon: Calculator,
    title: "DAS Automático",
    description: "Calcula o valor mensal e lembra do prazo de pagamento.",
  },
  {
    icon: FileSpreadsheet,
    title: "Relatório Anual",
    description: "Preenche o DASN-SIMEI automaticamente com os dados do sistema.",
  },
];

const checkItems = [
  "Notas ilimitadas",
  "Cobranças Pix com QR Code",
  "DAS automático",
  "DASN-SIMEI automático",
  "14 dias grátis para testar",
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <header className="border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          <span className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight">
            Nota Fácil
          </span>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Entrar
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-5">
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28 md:py-40">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
          Emissor de NFS-e para MEI
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-[5.5rem] font-medium max-w-4xl leading-[1] tracking-[-0.03em]">
          Emita nota, controle recebimento
        </h1>
        <p className="mt-8 text-lg text-muted-foreground max-w-lg leading-relaxed">
          Cobranças Pix para MEI e autônomos que precisam faturar sem virar contador.
        </p>
        <div className="mt-10 flex gap-4">
          <Link href="/login">
            <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 h-12 text-base">
              Começar grátis
            </Button>
          </Link>
          <a href="#pricing">
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-border/60">
              Ver preços
            </Button>
          </a>
        </div>
      </section>

      {/* Features — dark band */}
      <section className="bg-deep-green py-24 md:py-32">
        <div className="container mx-auto px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral-soft mb-4">
            Funcionalidades
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-medium tracking-tight text-white max-w-2xl leading-[1.1]">
            Tudo que o MEI precisa, nada que não precisa
          </h2>
          <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3 mt-16">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-8 border-t border-white/10 group"
              >
                <f.icon className="h-5 w-5 text-coral-soft mb-5" strokeWidth={1.5} />
                <h3 className="text-lg font-medium text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
              Preços
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-medium tracking-tight leading-[1.1]">
              Simples e transparente
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl border border-border p-8 flex flex-col">
              <h3 className="text-lg font-medium mb-1">Grátis</h3>
              <p className="text-4xl font-[family-name:var(--font-display)] font-medium tracking-tight mt-4">
                R$ 0
                <span className="text-base text-muted-foreground font-normal ml-1">/mês</span>
              </p>
              <ul className="mt-8 space-y-3 text-sm text-muted-foreground flex-1">
                <li className="flex items-center gap-2">
                  <span className="text-foreground">✓</span> 5 notas por mês
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-foreground">✓</span> Cadastro de clientes
                </li>
                <li className="flex items-center gap-2 line-through opacity-50">— Cobranças Pix</li>
                <li className="flex items-center gap-2 line-through opacity-50">— DAS automático</li>
                <li className="flex items-center gap-2 line-through opacity-50">— DASN-SIMEI</li>
              </ul>
              <Link href="/login" className="mt-8">
                <Button variant="outline" className="w-full rounded-full h-11">
                  Começar grátis
                </Button>
              </Link>
            </div>

            {/* PRO */}
            <div className="rounded-2xl border border-accent/40 bg-card p-8 flex flex-col relative">
              <span className="absolute -top-3 left-6 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                Popular
              </span>
              <h3 className="text-lg font-medium mb-1">PRO</h3>
              <p className="text-4xl font-[family-name:var(--font-display)] font-medium tracking-tight mt-4">
                R$ 29
                <span className="text-base text-muted-foreground font-normal ml-1">/mês</span>
              </p>
              <ul className="mt-8 space-y-3 text-sm flex-1">
                {checkItems.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login" className="mt-8">
                <Button className="w-full rounded-full h-11 bg-accent text-accent-foreground hover:bg-accent/90">
                  Testar 14 dias grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10 mt-auto">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nota Fácil. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
