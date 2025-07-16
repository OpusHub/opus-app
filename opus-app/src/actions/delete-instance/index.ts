'use server'
import db from "@/db";
import { faqTable, instancesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";
import { eq } from "drizzle-orm";


export const deleteInstance = actionClient.schema(z.object({
    id: z.string().uuid(),
})).action(async ({parsedInput}) => {


    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user) {
        throw new Error("Unauthorized");
        
    }

    if (!session?.user.company.id) {
        throw new Error('Empresa não existe')
    }

    await db.delete(instancesTable).where(eq(instancesTable.id, parsedInput.id))

    revalidatePath('/agents/whatsapp-connect')
})