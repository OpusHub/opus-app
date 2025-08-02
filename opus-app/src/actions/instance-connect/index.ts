"use server";
import db from "@/db";
import { instancesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";

export const connectInstance = actionClient
  .schema(
    z.object({
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
        `https://api.opusbr.com/instance/connect/${parsedInput.name_id}`,
        {
          method: "GET",
          headers: {
            apikey: "2048e6b0075f33cc60b308014f963cc8",
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

      
      console.log("QR Code gerado:", { qrcode : data.base64});
      return  {
          qrcode : data.base64
        }
    } catch (err) {
      console.error("Erro ao gerar QR code:", err);
      throw new Error("Erro ao gerar QR code");
    }
  });
