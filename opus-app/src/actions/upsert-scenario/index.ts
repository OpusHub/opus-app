"use server";
import db from "@/db";
import { upsertScenarioSchema } from "./schema";
import { supportScenariosTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";

export const upsertScenario = actionClient
  .schema(upsertScenarioSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session?.user?.company?.id) {
      throw new Error("Empresa não existe");
    }

    await db
      .insert(supportScenariosTable)
      .values({
        id: parsedInput.id,
        userId: session?.user?.id,
        companyId: session?.user?.company?.id,
        title: parsedInput.title,
        instructions: parsedInput.instructions,
        enabled: parsedInput.enabled,
        orderIndex: parsedInput.orderIndex,
        instructions_processed: "TESTE",
      })
      .onConflictDoUpdate({
        target: [supportScenariosTable.id],
        set: {
          ...parsedInput,
        },
      });

    revalidatePath("/agents/service-scenario");
  });
