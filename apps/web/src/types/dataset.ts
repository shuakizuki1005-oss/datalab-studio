export type DatasetStatus = "ready" | "processing" | "error";
export interface Dataset {
    id: string;
    name: string;
    rows: number;
    columns: number;
    size: string;
    status: DatasetStatus;
    createdAt: string;
}

export interface DashboardStats {
    datasets: number;
    experiments: number;
    bestAccuracy: number;
    models: number;
}