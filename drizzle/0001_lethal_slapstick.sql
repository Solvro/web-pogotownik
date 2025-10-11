ALTER TABLE "defibrillators" ALTER COLUMN "osm_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "defibrillators" ALTER COLUMN "osm_type" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "defibrillators" ALTER COLUMN "access" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "defibrillators" ALTER COLUMN "indoor" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "defibrillators" ALTER COLUMN "emergency" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "defibrillators" ALTER COLUMN "emergency" SET DEFAULT 'defibrillator';--> statement-breakpoint
ALTER TABLE "defibrillators" ALTER COLUMN "phone" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "defibrillators" ALTER COLUMN "opening_hours" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "defibrillators" ALTER COLUMN "emergency_phone" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "defibrillators" ALTER COLUMN "level" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "defibrillators" ALTER COLUMN "check_date" SET DATA TYPE varchar(255);