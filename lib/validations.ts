import { z } from "zod/v4";

export const clientSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  cpfCnpj: z.string().min(11, "CPF/CNPJ inválido"),
  email: z.email("E-mail inválido").optional().or(z.literal("")),
  endereco: z.string().optional(),
  tipo: z.enum(["PF", "PJ"]),
});

export const invoiceSchema = z.object({
  clientId: z.string().min(1, "Selecione um cliente"),
  descricao: z.string().min(3, "Descrição é obrigatória"),
  valor: z.number().positive("Valor deve ser positivo"),
});

export type ClientInput = z.infer<typeof clientSchema>;
export type InvoiceInput = z.infer<typeof invoiceSchema>;
