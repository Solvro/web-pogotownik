CREATE TABLE "defibrillators" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "defibrillators_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"osm_id" varchar(50) NOT NULL,
	"osm_type" varchar(20) NOT NULL,
	"osm_version" integer,
	"location" geography(Point, 4326) NOT NULL,
	"access" varchar(50),
	"indoor" varchar(10),
	"emergency" varchar(50) DEFAULT 'defibrillator' NOT NULL,
	"phone" varchar(50),
	"opening_hours" varchar(100),
	"emergency_phone" varchar(50),
	"defibrillator_location" text,
	"defibrillator_location_pl" text,
	"defibrillator_location_en" text,
	"level" varchar(10),
	"check_date" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "defibrillators_osm_id_unique" UNIQUE("osm_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
