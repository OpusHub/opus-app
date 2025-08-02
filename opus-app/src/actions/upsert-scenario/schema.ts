import { z } from "zod";

export const upsertScenarioSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2).max(100),
  instructions: z.string(),
  instructions_processed: z.string(),
  userId: z.string().uuid().optional(),
  companyId: z.string().uuid().optional(),
  enabled: z.boolean().default(true),
  orderIndex: z.number().default(0),
});

export type UpsertScenarioSchema = z.infer<typeof upsertScenarioSchema>;
