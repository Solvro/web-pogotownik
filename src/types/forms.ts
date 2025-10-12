import type { z } from "zod";

import type { reportSchema } from "@/schemas";

export type reportFormValues = z.infer<typeof reportSchema>;
