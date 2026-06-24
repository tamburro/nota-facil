"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, QrCode, Users, Calculator } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Painel", icon: LayoutDashboard },
  { href: "/dashboard/notas", label: "Notas", icon: FileText },
  { href: "/dashboard/cobrancas", label: "Cobranças", icon: QrCode },
  { href: "/dashboard/clientes", label: "Clientes", icon: Users },
  { href: "/dashboard/das", label: "DAS", icon: Calculator },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur md:hidden">
      <ul className="flex items-stretch pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-medium transition-colors",
                  active ? "text-accent" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <span className="absolute top-0 h-0.5 w-7 rounded-full bg-accent" />
                )}
                <item.icon className="h-5 w-5" strokeWidth={1.5} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
