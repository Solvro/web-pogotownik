export function parseFireCSV(csv: string) {
  const [header, ...rows] = csv.trim().split("\n");
  const keys = header.split(",");
  return rows.map((row) => {
    const values = row.split(",");
    const object: Record<string, string | number> = {};
    for (const [index, value] of values.entries()) {
      object[keys[index]] = Number.isNaN(Number(value)) ? value : Number(value);
    }
    return object;
  });
}
