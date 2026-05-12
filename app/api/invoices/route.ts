import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { invoiceSchema } from "@/lib/validations";
import { PLAN_LIMITS } from "@/lib/subscription";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const invoices = await db.invoice.findMany({
    where: { userId: session.user.id },
    include: { client: true, cobranca: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(invoices);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

  const limits = PLAN_LIMITS[user.plan];
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const monthCount = await db.invoice.count({
    where: { userId: user.id, createdAt: { gte: startOfMonth } },
  });

  if (monthCount >= limits.invoicesPerMonth) {
    return NextResponse.json({ error: "Limite de notas do mês atingido" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = invoiceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues }, { status: 400 });

  const invoice = await db.invoice.create({
    data: { ...parsed.data, userId: session.user.id },
    include: { client: true },
  });

  return NextResponse.json(invoice, { status: 201 });
}
