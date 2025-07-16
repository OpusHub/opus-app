import { z } from 'zod'

export const upsertInstanceSchema = z.object({
      id: z.string().uuid().optional(),
      userId: z.string().uuid().optional(),
      number: z.string(),
      name: z.string(),
      name_id: z.string(),
      status: z.string(),
      token: z.string(),


    });


export type UpsertInstanceSchema = z.infer<typeof upsertInstanceSchema>