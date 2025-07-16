import { z } from 'zod'

export const updateAgentStatusSchema = z.object({
      id: z.string().uuid().optional(),
      status: z.string()
    });


export type updateAgentStatusSchema = z.infer<typeof updateAgentStatusSchema>