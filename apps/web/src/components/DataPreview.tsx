
"use client";

import { useMemo, useState } from "react";
import type { CsvDataset } from "@/types/csv";

interface Props {
  dataset: CsvDataset;
}

export default function DataPreview({ dataset }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredRows = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return dataset.rows;

    return dataset.rows.filter((row) =>
      row.some((value) =>
        value.toLowerCase().includes(keyword)
      )
    );
  }, [dataset, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRows.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleRows = filteredRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Data Preview
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {filteredRows.length.toLocaleString()} matching rows
          </p>
        </div>

        <input
          type="search"
          placeholder="Search data..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white outline-none focus:border-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              {dataset.columns.map((column, index) => (
                <th key={index} className="px-4 py-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-slate-800 text-slate-300"
              >
                {row.map((value, columnIndex) => (
                  <td key={columnIndex} className="px-4 py-3">
                    {value || (
                      <span className="text-slate-600">NULL</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRows.length === 0 && (
        <p className="py-8 text-center text-slate-400">
          No matching rows found.
        </p>
      )}

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Page {currentPage} of {totalPages}
        </p>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white disabled:opacity-40"
          >
            Previous
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
