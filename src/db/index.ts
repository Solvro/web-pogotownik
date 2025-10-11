import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "@/env";

// You can specify any property from the node-postgres connection options
// eslint-disable-next-line import/no-default-export
export default drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
    ssl: false,
  },
});
