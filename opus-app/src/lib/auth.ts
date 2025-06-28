import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db/index";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { companysTable } from "@/db/schema";
import { customSession } from "better-auth/plugins";


export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", 
    usePlural: true,
    schema: schema, // Ensure this matches your schema import
  }),
  plugins: [
    customSession(async ({user, session }) => {
      const companies = await db.query.companysTable.findMany({
        where: eq(companysTable.userId, user.id),
      });
      const company = companies[0];
      return {
        user: {
          ...user,
          company: {
            id: company.id,
            name: company.name,
            logo: company.logoImageUrl

          }
        },
        session,
      }
    }),
  ],
  user: {
    modelName: "usersTable", // Ensure this matches your schema
  },
    session: {
        modelName: "authSessionsTable", // Ensure this matches your schema
    },    
    account: {
        modelName: "accountsTable", // Ensure this matches your schema
    },
    verification: {
        modelName: "verificationsTable", // Ensure this matches your schema
    },
    emailAndPassword: {
        enabled: true,
    }
  //... the rest of your config
});
