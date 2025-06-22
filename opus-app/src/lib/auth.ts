import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db/index";
import * as schema from "@/db/schema";


export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", 
    usePlural: true,
    schema: schema, // Ensure this matches your schema import
  }),
  user : {
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
