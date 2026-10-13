import type {DashboardStats, Dataset} from "@/types/dataset";

export const dashboardStats: DashboardStats = {
    datasets: 3,
    experiments: 12,
    bestAccuracy: 94.2,
    models: 4,
};

export const datasets: Dataset[] = [
    {
        id: "ds-001",
        name: "sales_2026.csv",
        rows: 12500,
        columns: 14,
        size: "2.4 MB",
        status: "ready",
        createdAt: "2026-10-13",
    },
    {
        id: "ds-002",
        name: "housing.csv",
        rows: 5060,
        columns: 12,
        size: "1.1 MB",
        status: "ready",
        createdAt: "2026-10-12",
    },
    {
        id: "ds_003",
        name: "customers.csv",
        rows: 8200,
        columns: 9,
        size: "1.8 MB",
        status: "ready",
        createdAt: "2026-10-11",
    },
];