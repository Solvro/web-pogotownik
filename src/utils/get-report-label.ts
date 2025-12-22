import { reportEventType } from "@/config/constants";
import type { ReportEventType } from "@/types/reports";

export const getReportLabel = (value: ReportEventType) =>
  reportEventType.find((event) => event.value === value)?.label;
