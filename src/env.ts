import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { z } from "zod";

try {
  config({ path: ".env.local" });
} catch {
  // ignore
}

export const env = createEnv({
  server: {
    NASA_FIRMS_MAP_KEY: z.string().length(32),
    DATABASE_URL: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_MAPS_KEY: z.string().length(39),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    NASA_FIRMS_MAP_KEY: process.env.NASA_FIRMS_MAP_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
