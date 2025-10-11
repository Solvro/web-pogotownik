import { readFile } from "node:fs/promises";
import path from "node:path";

import database from "../../src/db/index.js";
import { transformDefibrillatorFeatures } from "../../src/lib/helpers/defibrillators.js";
import type { DefibrillatorCollection } from "../../src/types/defibrillators.js";
import { defibrillatorsTable } from "../schema/public.js";

/**
 * Seeds the database with defibrillator data from PL.geojson file
 */
async function seedDefibrillators() {
  try {
    // Read the GeoJSON file
    const geoJsonPath = path.join(process.cwd(), "./assets/PL.geojson");

    const fileContent = await readFile(geoJsonPath, "utf8");
    const geoJsonData = JSON.parse(fileContent) as DefibrillatorCollection;

    // Transform GeoJSON features to database format
    const defibrillatorInserts = transformDefibrillatorFeatures(
      geoJsonData.features,
    );

    // Clear existing data (optional - remove if you want to keep existing data)
    await database.delete(defibrillatorsTable);

    // Insert data in batches to avoid memory issues
    const batchSize = 100;
    let insertedCount = 0;

    for (
      let index = 0;
      index < defibrillatorInserts.length;
      index += batchSize
    ) {
      const batch = defibrillatorInserts.slice(index, index + batchSize);

      try {
        await database.insert(defibrillatorsTable).values(batch);
        insertedCount += batch.length;
      } catch (error) {
        console.error(
          `❌ Error inserting batch starting at index ${index.toString()}:`,
          error,
        );

        // Try inserting records one by one to identify problematic ones
        for (const record of batch) {
          try {
            await database.insert(defibrillatorsTable).values(record);
            insertedCount++;
          } catch (recordError) {
            console.error(
              `❌ Failed to insert record with OSM ID ${record.osmId}:`,
              recordError,
            );
            console.error(
              "Problematic record:",
              JSON.stringify(record, null, 2),
            );
          }
        }
      }
    }

    // Display some statistics
    const totalRecords = await database.select().from(defibrillatorsTable);

    // Show sample of inserted data
    const sampleRecords = await database
      .select({
        id: defibrillatorsTable.id,
        osmId: defibrillatorsTable.osmId,
        location: defibrillatorsTable.location,
        access: defibrillatorsTable.access,
        defibrillatorLocationPl: defibrillatorsTable.defibrillatorLocationPl,
      })
      .from(defibrillatorsTable)
      .limit(3);

    return {
      inserted: insertedCount,
      total: totalRecords.length,
      sample: sampleRecords,
    };
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    const result = await seedDefibrillators();
    console.error(
      `✅ Seed completed! Inserted ${result.inserted.toString()} defibrillator records.`,
    );
    console.error(
      `📈 Total defibrillators in database: ${result.total.toString()}`,
    );
    console.error("📋 Sample records:");
    console.error(result.sample);
  } catch (error) {
    console.error("❌ Seeding process failed:", error);
    throw new Error("Seeding failed");
  }
}

// Run the seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}

await main();
