import type { z } from "zod";

import type { reportSchema } from "@/schemas";

export type ReportFormValues = z.infer<typeof reportSchema>;
