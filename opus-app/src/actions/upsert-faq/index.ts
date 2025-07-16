'use server'
import db from "@/db";
import { upsertFaqSchema } from "./schema";
import { agentTable, faqTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";


export const upsertFaq = actionClient.schema(upsertFaqSchema).action(async ({parsedInput}) => {


    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user) {
        throw new Error("Unauthorized");
        
    }

    if (!session?.user.company.id) {
        throw new Error('Empresa não existe')
    }

await db.insert(faqTable).values({
    id: parsedInput.id,
    userId: session.user.id,
    ...parsedInput
    }).onConflictDoUpdate({
  target: [agentTable.id],
  set: {
    ...parsedInput
  }
});

revalidatePath('/agents')
})