"use server";
import db from "@/db";
import { instancesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";
import { upsertInstanceSchema } from "./schema";
import { eq } from "drizzle-orm";

export const upsertInstance = actionClient
  .schema(upsertInstanceSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id || !session?.user.company?.id) {
      throw new Error("Usuário ou empresa não autenticados");
    }

    const instancePayload = {
      instanceName: parsedInput.name + '_'+ session.user.id ,
      qrcode: false,
      number: '55' + parsedInput.number.replaceAll('(', "").replaceAll(')', '').replaceAll(' ','').replaceAll('-',''),
      integration: "WHATSAPP-BAILEYS",
      rejectCall: false,
      groupsIgnore: true,
      alwaysOnline: false,
      readMessages: false,
      readStatus: false,
      syncFullHistory: false,
      webhook: {
        url: "https://api.maia.com",
        byEvents: false,
        base64: true,
        events: ["SEND_MESSAGE", "MESSAGES_UPSERT"],
      },
    };

    try {
      const response = await fetch("https://api.opusbr.com/instance/create", {
        method: "POST",
        headers: {
          apikey: "2048e6b0075f33cc60b308014f963cc8",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(instancePayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro na criação da instância: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      // Opcional: se a API retorna um hash ou apikey, você pode armazenar
      console.log("Instância criada com sucesso:", data);

      await db
        .insert(instancesTable)
        .values({
          id: parsedInput.id,
          userId: session.user.id,
          ...parsedInput,
          token: data.hash,
          name_id: data.instance.instanceName
        })
        .onConflictDoUpdate({
          target: [instancesTable.id],
          set: {
            ...parsedInput,
          },
        });

      revalidatePath("/agents/whatsapp-connect");

    } catch (err) {
      console.error("Erro ao integrar com Evolution API:", err);
      throw new Error("Erro ao criar instância na Evolution API");
    }
  });
