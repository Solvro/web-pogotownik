import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NASA_FIRMS_MAP_KEY: z.string().length(32),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_MAPS_KEY: z.string().length(39),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    NASA_FIRMS_MAP_KEY: process.env.NASA_FIRMS_MAP_KEY,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
