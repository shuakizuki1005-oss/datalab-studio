
import type { CsvDataset, CsvSummary } from "@/types/csv";

export function parseCsv(text: string): {
  columns: string[];
  rows: string[][];
} {
  const records: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const input = text.replace(/^\uFEFF/, "");

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"' && field === "") {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && input[i + 1] === "\n") {
        i++;
      }

      row.push(field);
      records.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (inQuotes) {
    throw new Error("CSVの引用符が閉じられていません。");
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    records.push(row);
  }

  const nonEmptyRecords = records.filter(
    (record) => record.some((value) => value.trim() !== "")
  );

  if (nonEmptyRecords.length === 0) {
    throw new Error("CSVファイルが空です。");
  }

  const [columns, ...rows] = nonEmptyRecords;

  if (columns.length === 0 || columns.some((c) => c.trim() === "")) {
    throw new Error("CSVのヘッダーが不正です。");
  }

  if (rows.some((r) => r.length !== columns.length)) {
    throw new Error("列数が一致しない行があります。");
  }

  return { columns, rows };
}

export function summarizeCsv(dataset: CsvDataset): CsvSummary {
  const missingCount = dataset.rows.reduce(
    (total, row) =>
      total +
      row.filter((value) => value.trim() === "").length,
    0
  );

  return {
    rowCount: dataset.rows.length,
    columnCount: dataset.columns.length,
    missingCount,
  };
}
