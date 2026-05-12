import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Emissor de NFS-e",
    description: "Integração nacional. Emita em 3 cliques com cliente e serviço salvos.",
  },
  {
    title: "Cobranças Pix",
    description: "QR Code vinculado à nota com confirmação automática de pagamento.",
  },
  {
    title: "Controle de Recebimentos",
    description: "Notas emitidas, pagas, pendentes e vencidas com alertas.",
  },
  {
    title: "DAS Automático",
    description: "Calcula o valor mensal e lembra do prazo de pagamento.",
  },
  {
    title: "Relatório Anual",
    description: "Preenche o DASN-SIMEI automaticamente com os dados do sistema.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <span className="text-xl font-bold text-accent">Nota Fácil</span>
          <Link href="/login">
            <Button variant="outline" size="sm">Entrar</Button>
          </Link>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
          Emita nota, controle recebimento.{" "}
          <span className="text-accent">Em 30 segundos.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Emissor de NFS-e e cobranças Pix para MEI e autônomos que precisam faturar sem virar contador.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/login">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Começar grátis
            </Button>
          </Link>
          <a href="#pricing">
            <Button size="lg" variant="outline">Ver preços</Button>
          </a>
        </div>
      </section>

      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tudo que o MEI precisa</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {features.map((f) => (
              <Card key={f.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Preços simples</h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Grátis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-3xl font-bold">R$ 0<span className="text-sm text-muted-foreground font-normal">/mês</span></p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• 5 notas por mês</li>
                  <li>• Cadastro de clientes</li>
                  <li className="line-through">Cobranças Pix</li>
                  <li className="line-through">DAS automático</li>
                  <li className="line-through">DASN-SIMEI</li>
                </ul>
                <Link href="/login">
                  <Button variant="outline" className="w-full">Começar grátis</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-accent/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Popular
              </div>
              <CardHeader>
                <CardTitle>PRO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-3xl font-bold">R$ 29<span className="text-sm text-muted-foreground font-normal">/mês</span></p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Notas ilimitadas</li>
                  <li>• Cobranças Pix com QR Code</li>
                  <li>• DAS automático</li>
                  <li>• DASN-SIMEI automático</li>
                  <li>• 14 dias grátis</li>
                </ul>
                <Link href="/login">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Testar 14 dias grátis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nota Fácil. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
