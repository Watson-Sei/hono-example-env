import { createClient, Config } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
    url: process.env.TURSO_URL! as string
});

export const db = drizzle(client);