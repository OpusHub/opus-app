"use server";
import db from "@/db";
import { instancesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";
import { eq } from "drizzle-orm";

export const checkInstanceConnect = actionClient
  .schema(
    z.object({
      id: z.string().uuid(),
      name_id: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id || !session?.user.company?.id) {
      throw new Error("Usuário ou empresa não autenticados");
    }

    try {
      const response = await fetch(
        `https://evo-evolution-api.mxqlmx.easypanel.host/instance/connectionState/${parsedInput.name_id}`,
        {
          method: "GET",
          headers: {
            apikey: "429683C4C977415CAAFCCE10F7D57E11",
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Erro ao gerar QR code da instância: ${response.status} - ${errorText}`,
        );
      }

      const data = await response.json();

      await db
        .update(instancesTable)
        .set({ status: data.instance.state})
        .where(eq(instancesTable.id, parsedInput.id));

      console.log("Status da Conexão:", { state: data.instance.state });
      revalidatePath('/agents/whatsapp-connect')
      return {
        state: data.instance.state,
      };
    } catch (err) {
      console.error("Erro ao gerar QR code:", err);
      throw new Error("Erro ao gerar QR code");
    }
  });
