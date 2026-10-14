
"use client";

import { useState } from "react";
import { parseCsv } from "@/lib/csv-parser";
import type { CsvDataset } from "@/types/csv";

import { analyzeCsv} from "@/lib/api";
import type { AnalysisResult } from "@/types/analysis";

interface CsvUploaderProps {
  onUpload: (
    dataset: CsvDataset,
    analysis: AnalysisResult,
    ) => void;
}

export default function CsvUploader({
  onUpload,
}: CsvUploaderProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFile(file?: File) {
    if (!file) return;

    setError("");

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("CSVファイルを選択してください。");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("10MB以下のCSVを選択してください。");
      return;
    }

    setLoading(true);

    try {
      const text = await file.text();
      const parsed = parseCsv(text);

      const dataset: CsvDataset = {
        id: crypto.randomUUID(),
        name: file.name,
        columns: parsed.columns,
        rows: parsed.rows,
        createdAt: new Date().toISOString(),
      };

      const analysis: AnalysisResult = await analyzeCsv(file);
      onUpload(dataset, analysis);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "読み込みに失敗しました。"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white">
          Upload CSV Dataset
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Select a CSV file to analyze locally.
        </p>

        <label className="mt-5 inline-block cursor-pointer rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500">
          {loading ? "Loading..." : "Choose CSV File"}
          <input
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            disabled={loading}
            onChange={(event) => {
              void handleFile(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
        </label>

        <p className="mt-3 text-xs text-slate-500">
          Maximum file size: 10 MB
        </p>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
