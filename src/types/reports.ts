import type { InferSelectModel } from "drizzle-orm";

import type { reportsTable } from "../../drizzle/schema";
import type { Coordinates } from "./app";

export type UserReport = InferSelectModel<typeof reportsTable>;

export type UserReportMetadata = Omit<UserReport, "id" | keyof Coordinates>;
