export interface CsvDataset {
    id: string;
    name: string;
    columns: string[];
    rows: string[][];
    createdAt: string;
}

export interface CsvSummary {
    rowCount: number;
    columnCount: number;
    missingCount: number;
}