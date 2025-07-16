import { z } from 'zod'

export const upsertAgentSchema = z.object({
      id: z.string().uuid().optional(),
      name: z
        .string()
        .min(2, { message: "Nome do seu agente tem que ter no mínimo 2 caracteres." })
        .max(100, { message: "Limite de 100 caracteres atingido." }),
      tom: z
        .string()
        .max(100, { message: "Limite de 100 caracteres atingido." })
        .nonempty({ message: "Campo obrigatório." }),
      about: z
        .string()
        .max(1000, { message: "Limite de 1.000 caracteres atingido." })
        .nonempty({ message: "Campo obrigatório." }),
      type: z.enum([
        "SDR",
        "Suporte",
        "Vendas",
        "Marketing",
        "Financeiro",
        "RH",
      ], { 
        required_error: "Tipo do agente é obrigatório." 
      }),
      question_alvo: z
        .string()
        .max(500, { message: "Limite de 500 caracteres atingido." })
        .optional(),
      qualification_role: z
        .string()
        .max(500, { message: "Limite de 500 caracteres atingido." })
        .optional(),
    });


export type UpsertAgentSchema = z.infer<typeof upsertAgentSchema>