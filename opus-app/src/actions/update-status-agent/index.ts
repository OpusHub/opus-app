'use server'
import db from "@/db";
import { updateAgentStatusSchema } from "./schema";
import { agentTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";


export const updateAgentStatus = actionClient.schema(updateAgentStatusSchema).action(async ({parsedInput}) => {


    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user) {
        throw new Error("Unauthorized");
        
    }

    if (!session?.user.company.id) {
        throw new Error('Empresa não existe')
    }


if (!parsedInput.id) {
    throw new Error("Agent ID is required");
}

await db.update(agentTable)
    .set({ status: parsedInput.status })
    .where(eq(agentTable.id, parsedInput.id));
    
console.log("agente " + parsedInput.id)
revalidatePath('/agents')
})