'use server'
import db from "@/db";
import { supportScenariosTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";
import { eq } from "drizzle-orm";


export const deleteScenario = actionClient.schema(z.object({
    id: z.string().uuid(),
})).action(async ({parsedInput}) => {


    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user) {
        throw new Error("Unauthorized");
        
    }

    if (!session?.user?.company?.id) {
        throw new Error('Empresa não existe')
    }

    await db.delete(supportScenariosTable).where(eq(supportScenariosTable.id, parsedInput.id))

    revalidatePath('/agents/service-scenario')
})