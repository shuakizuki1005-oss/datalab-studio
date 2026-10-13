
import { summarizeCsv } from "@/lib/csv-parser";
import type { CsvDataset } from "@/types/csv";

interface Props {
  dataset: CsvDataset;
}

export default function DatasetSummary({ dataset }: Props) {
  const summary = summarizeCsv(dataset);

  const stats = [
    { label: "Rows", value: summary.rowCount },
    { label: "Columns", value: summary.columnCount },
    { label: "Missing Values", value: summary.missingCount },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-slate-800 bg-slate-900 p-6"
        >
          <p className="text-sm text-slate-400">{stat.label}</p>
          <p className="mt-3 text-3xl font-bold text-white">
            {stat.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
