
import type { Dataset } from "@/types/dataset";

interface DatasetTableProps {
  datasets: Dataset[];
}

export default function DatasetTable({
  datasets,
}: DatasetTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-800 text-slate-400">
          <tr>
            <th className="p-4">Dataset</th>
            <th className="p-4">Rows</th>
            <th className="p-4">Columns</th>
            <th className="p-4">Size</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {datasets.map((dataset) => (
            <tr
              key={dataset.id}
              className="border-b border-slate-800/60 text-slate-200 last:border-0"
            >
              <td className="p-4 font-medium">{dataset.name}</td>
              <td className="p-4">{dataset.rows.toLocaleString()}</td>
              <td className="p-4">{dataset.columns}</td>
              <td className="p-4">{dataset.size}</td>
              <td className="p-4">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  {dataset.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
