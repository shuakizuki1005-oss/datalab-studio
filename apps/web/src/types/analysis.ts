export interface NumericColumnStats {
    count: number;
    mean: number;
    median: number;
    std: number;
    min: number;
    max: number;
}

export interface AnalysisResult {
    filename: string;
    rows: number;
    columns: number;
    missing_values: number;
    numeric_columns: Record<string, NumericColumnStats>;
    missing_by_column: Record<string, number>;
}