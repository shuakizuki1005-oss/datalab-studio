
"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import DatasetTable from "@/components/DatasetTable";
import CsvUploader from "@/components/CsvUploader";
import DataPreview from "@/components/DataPreview";
import DatasetSummary from "@/components/DatasetSummary";
import { dashboardStats, datasets } from "@/lib/mock-data";
import type { CsvDataset } from "@/types/csv";

export default function Home() {
  const [uploadedDatasets, setUploadedDatasets] = useState<CsvDataset[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedDataset =
    uploadedDatasets.find((dataset) => dataset.id === selectedId) ?? null;

  function handleUpload(dataset: CsvDataset) {
    setUploadedDatasets((previous) => [dataset, ...previous]);
    setSelectedId(dataset.id);
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <header className="mb-10">
          <p className="text-sm text-blue-400">
            Workspace / Data Management
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            DataLab Studio
          </h1>

          <p className="mt-2 text-slate-400">
            Explore datasets and prepare for machine learning.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Datasets"
            value={dashboardStats.datasets + uploadedDatasets.length}
            description="Demo + uploaded datasets"
          />
          <StatCard
            title="Experiments"
            value={dashboardStats.experiments}
            description="Demo training runs"
          />
          <StatCard
            title="Best Accuracy"
            value={`${dashboardStats.bestAccuracy}%`}
            description="Demo model performance"
          />
          <StatCard
            title="Models"
            value={dashboardStats.models}
            description="Demo registered models"
          />
        </section>

        <section className="mt-10">
          <CsvUploader onUpload={handleUpload} />
        </section>

        {uploadedDatasets.length > 0 && (
          <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5">
            <label
              htmlFor="dataset-select"
              className="mb-3 block text-sm text-slate-400"
            >
              Select Uploaded Dataset
            </label>

            <select
              id="dataset-select"
              value={selectedId ?? ""}
              onChange={(event) => setSelectedId(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            >
              {uploadedDatasets.map((dataset) => (
                <option key={dataset.id} value={dataset.id}>
                  {dataset.name}
                </option>
              ))}
            </select>
          </section>
        )}

        {selectedDataset && (
          <div className="mt-8 space-y-8">
            <DatasetSummary dataset={selectedDataset} />
            <DataPreview
              key={selectedDataset.id}
              dataset={selectedDataset}
            />
          </div>
        )}

        <section className="mt-10">
          <h2 className="mb-5 text-xl font-semibold">
            Demo Datasets
          </h2>
          <DatasetTable datasets={datasets} />
        </section>

        <footer className="mt-10 text-xs text-slate-500">
          Files are processed locally in your browser.
          Uploaded data is cleared when the page reloads.
        </footer>
      </main>
    </div>
  );
}
