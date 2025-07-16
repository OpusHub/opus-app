'use server'
import db from "@/db";
import { upsertAgentSchema } from "./schema";
import { agentTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";


export const upsertAgent = actionClient.schema(upsertAgentSchema).action(async ({parsedInput}) => {


    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user) {
        throw new Error("Unauthorized");
        
    }

    if (!session?.user.company.id) {
        throw new Error('Empresa não existe')
    }

await db.insert(agentTable).values({
    id: parsedInput.id,
    userId: session.user.id,
    ...parsedInput
    }).onConflictDoUpdate({
  target: [agentTable.id],
  set: {
    ...parsedInput
  }
});
})