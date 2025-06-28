"use server";

import db from "@/db/index";
import { companysTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCompany(data: FormData) {
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const name = data.get("name")?.toString().trim();
  const industry = data.get("industry")?.toString().trim();
  const address = data.get("address")?.toString().trim();
  const phone = data.get("phone")?.toString().trim();
  const website = data.get("website")?.toString().trim();
  const instagram = data.get("instagram")?.toString().trim();
  const linkedin = data.get("linkedin")?.toString().trim();
  const logoImageUrl = data.get("logo")?.toString().trim()  || "";

  if (
    !name ||
    !industry ||
    !address ||
    !phone 
  ) {
    throw new Error("Missing required company fields");
  }

  const companyData = {
    name,
    industry,
    address,
    phone,
    website,
    instagram,
    linkedin,
    logoImageUrl,
    userId: session.user.id
  };

  await db
    .insert(companysTable)
    .values(companyData)
    .returning();
  
    redirect("/dashboard");
}
