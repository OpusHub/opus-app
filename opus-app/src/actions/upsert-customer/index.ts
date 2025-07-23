'use server'
import db from "@/db";
import { upsertCustomerSchema } from "./schema";
import { customersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";


export const upsertCustomer = actionClient.schema(upsertCustomerSchema).action(async ({parsedInput}) => {


    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user) {
        throw new Error("Unauthorized");
        
    }

    if (!session?.user.company.id) {
        throw new Error('Empresa não existe')
    }

await db.insert(customersTable).values({
    id: parsedInput.id,
    userId: session.user.id,
    ...parsedInput
}).onConflictDoUpdate({
  target: [customersTable.id],
  set: {
    ...parsedInput
  }
});

revalidatePath('/clients')
})