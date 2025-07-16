'use server'
import db from "@/db";
import { instancesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";
import { eq } from "drizzle-orm";
import { upsertInstanceSchema } from "./schema";


export const upsertInstance = actionClient.schema(upsertInstanceSchema).action(async ({parsedInput}) =>{


    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user) {
        throw new Error("Unauthorized");
        
    }

    if (!session?.user.company.id) {
        throw new Error('Empresa não existe')
    }

await db.insert(instancesTable).values({
    id: parsedInput.id,
    userId: session.user.id,
    ...parsedInput
}).onConflictDoUpdate({
  target: [instancesTable.id],
  set: {
    ...parsedInput
    // Add other fields to update as needed
  }
});
    revalidatePath('/agents/whatsapp-connect')
})