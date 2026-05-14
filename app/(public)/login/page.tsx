"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("resend", { email, callbackUrl: "/dashboard" });
    setSent(true);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight">
            Nota Fácil
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Entre na sua conta para continuar
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full rounded-full h-11 border-border/60"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            Entrar com Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground tracking-wider">ou</span>
            </div>
          </div>

          {sent ? (
            <p className="text-center text-sm text-muted-foreground py-4">
              Link de acesso enviado para <strong className="text-foreground">{email}</strong>. Verifique seu e-mail.
            </p>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-3">
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-lg"
                required
              />
              <Button
                type="submit"
                className="w-full rounded-full h-11 bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Entrar com e-mail"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
