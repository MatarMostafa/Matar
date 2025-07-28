// src/Utils/exportCsv.ts

export function jsonToCsv(data: any[], delimiter = ";"): string {
  if (!data.length) return "";

  const headers = Object.keys(data[0]);
  const csvRows = data.map((row) =>
    headers.map((field) => String(row[field] ?? "")).join(delimiter)
  );

  return [headers.join(delimiter), ...csvRows].join("\n");
}