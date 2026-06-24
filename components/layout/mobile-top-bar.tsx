"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { CreditCard, LogOut, UserRound } from "lucide-react";

export function MobileTopBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur md:hidden">
      <Link
        href="/dashboard"
        className="font-[family-name:var(--font-display)] text-lg font-medium tracking-tight"
      >
        Nota Fácil
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="Conta"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
        >
          <UserRound className="h-5 w-5" strokeWidth={1.5} />
        </SheetTrigger>

        <SheetContent side="bottom" className="rounded-t-2xl pb-[env(safe-area-inset-bottom)]">
          <SheetHeader className="text-left">
            <SheetTitle>Conta</SheetTitle>
            <SheetDescription className="sr-only">
              Opções da conta
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-1 px-4 pb-6">
            <Link
              href="/settings/billing"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-secondary/60"
            >
              <CreditCard className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              Assinatura
            </Link>

            <div className="flex items-center justify-between rounded-lg px-3 py-2">
              <span className="text-sm text-muted-foreground">Tema</span>
              <ThemeToggle />
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              Sair
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
