import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { PLAN_LIMITS } from "@/lib/subscription";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

  if (!PLAN_LIMITS[user.plan].pixCobrancas) {
    return NextResponse.json({ error: "Cobranças Pix requer plano PRO" }, { status: 403 });
  }

  const { invoiceId } = await req.json();
  const invoice = await db.invoice.findFirst({
    where: { id: invoiceId, userId: session.user.id },
  });

  if (!invoice) return NextResponse.json({ error: "Nota não encontrada" }, { status: 404 });

  const cobranca = await db.cobranca.create({
    data: {
      invoiceId: invoice.id,
      valor: invoice.valor,
      pixQrCode: `00020126360014BR.GOV.BCB.PIX0114${Date.now()}5204000053039865802BR5913NOTA FACIL6008SAOPAULO62070503***6304`,
    },
  });

  return NextResponse.json(cobranca, { status: 201 });
}
