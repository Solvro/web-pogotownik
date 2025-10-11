import { defineConfig } from "drizzle-kit";

import { env } from "@/env";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  out: "./drizzle",
  schema: ["./drizzle/schema/index.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
