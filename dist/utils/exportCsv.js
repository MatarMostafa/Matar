"use strict";
// src/Utils/exportCsv.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToCsv = jsonToCsv;
function jsonToCsv(data, delimiter = ";") {
    if (!data.length)
        return "";
    const headers = Object.keys(data[0]);
    const csvRows = data.map((row) => headers.map((field) => String(row[field] ?? "")).join(delimiter));
    return [headers.join(delimiter), ...csvRows].join("\n");
}
