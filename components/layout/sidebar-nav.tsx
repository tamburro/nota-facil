"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/dashboard", label: "Painel" },
  { href: "/dashboard/notas", label: "Notas Fiscais" },
  { href: "/dashboard/clientes", label: "Clientes" },
  { href: "/dashboard/cobrancas", label: "Cobranças Pix" },
  { href: "/dashboard/das", label: "DAS" },
  { href: "/settings/billing", label: "Assinatura" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 border-r border-border bg-sidebar min-h-screen p-4">
      <Link href="/dashboard" className="text-xl font-bold text-accent mb-8">
        Nota Fácil
      </Link>
      <nav className="flex flex-col gap-1 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-3 py-2 rounded-md text-sm transition-colors",
              pathname === link.href
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Button
        variant="ghost"
        className="justify-start text-muted-foreground"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sair
      </Button>
    </aside>
  );
}
