import {
  customType,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// PostGIS geography type for storing geographic coordinates
const geography = customType<{ data: string; driverData: string }>({
  dataType() {
    return "geography(Point, 4326)";
  },
});

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const defibrillatorsTable = pgTable("defibrillators", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  osmId: varchar("osm_id", { length: 255 }).notNull().unique(),
  osmType: varchar("osm_type", { length: 255 }).notNull(),
  osmVersion: integer("osm_version"),

  // Geographic location using PostGIS
  location: geography("location").notNull(),

  // Basic properties
  access: varchar({ length: 255 }),
  indoor: varchar({ length: 255 }),
  emergency: varchar({ length: 255 }).notNull().default("defibrillator"),

  // Contact and availability
  phone: varchar({ length: 255 }), // Zwiększone z 50 na 100 dla długich numerów telefonów
  openingHours: varchar("opening_hours", { length: 255 }), // Zwiększone z 100 na 200 dla złożonych godzin otwarcia
  emergencyPhone: varchar("emergency_phone", { length: 255 }), // Zwiększone z 50 na 100

  // Location description
  defibrillatorLocation: text("defibrillator_location"),
  defibrillatorLocationPl: text("defibrillator_location_pl"),
  defibrillatorLocationEn: text("defibrillator_location_en"),

  // Additional info
  level: varchar({ length: 255 }),
  checkDate: varchar("check_date", { length: 255 }),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
