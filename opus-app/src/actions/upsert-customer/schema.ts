import { z } from 'zod'

export const upsertCustomerSchema = z.object({
    id: z.string().uuid().optional(),
      name: z
    .string()
    .min(2, {
      message: "Nome do seu cliente tem que ter no mínimo 2 caracteres.",
    })
    .max(100, { message: "Limite de 100 caracteres atingido." }),
    phone: z.string().max(18 , { message:  "Limite de caracteres atingido" }).nonempty({ message:  "Campo Obrigatório" }),
    email: z.string().optional(),
    status_ai: z.string().nonempty({ message:  "Campo Obrigatório" })
    });


export type UpsertCustomerSchema = z.infer<typeof upsertCustomerSchema>