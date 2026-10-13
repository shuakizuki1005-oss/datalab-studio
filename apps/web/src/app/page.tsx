
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import DatasetTable from "@/components/DatasetTable";
import { dashboardStats, datasets } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <header className="mb-10">
          <p className="text-sm text-blue-400">
            Workspace / Overview
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Manage datasets, experiments, and machine learning models.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Datasets"
            value={dashboardStats.datasets}
            description="Available datasets"
          />

          <StatCard
            title="Experiments"
            value={dashboardStats.experiments}
            description="Training runs"
          />

          <StatCard
            title="Best Accuracy"
            value={`${dashboardStats.bestAccuracy}%`}
            description="Demo model performance"
          />

          <StatCard
            title="Models"
            value={dashboardStats.models}
            description="Registered models"
          />
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Recent Datasets
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Recently added datasets
            </p>
          </div>

          <DatasetTable datasets={datasets} />
        </section>

        <footer className="mt-10 text-xs text-slate-500">
          Demo data only — Python API integration coming soon.
        </footer>
      </main>
    </div>
  );
}
