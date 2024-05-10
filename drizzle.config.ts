import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
    dialect: 'sqlite',
    schema: './db/schema.ts',
    out: './drizzle',
    driver: 'turso',
    dbCredentials: {
        url: 'http://127.0.0.1:8080',
    }
} satisfies Config;