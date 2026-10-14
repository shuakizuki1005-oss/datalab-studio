import type { AnalysisResult } from "@/types/analysis";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function analyzeCsv(
    file: File
): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append("file", file);

    let response: Response;

    try {
        response = await fetch(
            `${API_BASE_URL}/datasets/analyze`,
            {
                method: "POST",
                body: formData,
            }
        );
    } catch {
        throw new Error(
            "Python APIに接続できません。FastAPIが起動しているか確認してください。"
        );
    }

    if (!response.ok) {
        let message = `APIエラー: HTTP ${response.status}`;

        try {
            const data = await response.json();

            if (typeof data.detail == "string") {
                message = data.detail;
            }
        } catch {
            // JSONでないエラーの場合はHTTPステータスを表示
        }

        throw new Error(message);
    }

    return (await response.json()) as AnalysisResult;
}