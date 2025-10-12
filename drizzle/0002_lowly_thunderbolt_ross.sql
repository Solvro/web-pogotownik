CREATE TYPE "public"."report_event_type" AS ENUM('drone', 'protest', 'no_energy', 'other');--> statement-breakpoint
CREATE TABLE "reports" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reports_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"reportEventType" "report_event_type" NOT NULL,
	"description" text NOT NULL,
	"lat" integer NOT NULL,
	"lng" integer NOT NULL
);
