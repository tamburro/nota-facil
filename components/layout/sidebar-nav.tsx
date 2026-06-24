"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LayoutDashboard, FileText, Users, QrCode, Calculator, CreditCard, LogOut } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Painel", icon: LayoutDashboard },
  { href: "/dashboard/notas", label: "Notas Fiscais", icon: FileText },
  { href: "/dashboard/clientes", label: "Clientes", icon: Users },
  { href: "/dashboard/cobrancas", label: "Cobranças Pix", icon: QrCode },
  { href: "/dashboard/das", label: "DAS", icon: Calculator },
  { href: "/settings/billing", label: "Assinatura", icon: CreditCard },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-60 border-r border-border/50 bg-sidebar min-h-screen px-3 py-5">
      <Link
        href="/dashboard"
        className="font-[family-name:var(--font-display)] text-lg font-medium tracking-tight px-3 mb-8"
      >
        Nota Fácil
      </Link>
      <nav className="flex flex-col gap-0.5 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              pathname === link.href
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            <link.icon className="h-4 w-4" strokeWidth={1.5} />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="justify-start gap-3 text-muted-foreground hover:text-foreground px-3"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Sair
        </Button>
        <ThemeToggle />
      </div>
    </aside>
  );
}
