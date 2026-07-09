import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// The Prisma CLI doesn't read .env.local on its own — Next.js does at runtime,
// so this keeps DATABASE_URL in one place.
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    path: "prisma/migrations",
  },
});
