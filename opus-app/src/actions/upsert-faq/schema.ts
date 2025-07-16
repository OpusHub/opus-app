import { z } from 'zod'

export const upsertFaqSchema = z.object({
      id: z.string().uuid().optional(),
      userId: z.string().uuid().optional(),
      question: z
        .string()
        .max(100, { message: "Limite de 100 caracteres atingido." })
        .nonempty({ message: "Campo obrigatório." }),
      answer: z
        .string()
        .max(100, { message: "Limite de 100 caracteres atingido." })
        .nonempty({ message: "Campo obrigatório." }),

    });


export type UpsertFaqSchema = z.infer<typeof upsertFaqSchema>