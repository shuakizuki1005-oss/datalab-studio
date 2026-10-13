from io import BytesIO

import pandas as pd
from fastapi import File, HTTPException, UploadFile

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="DataLab Studio API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["httl://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "DataLab Studio API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/datasets/analyze")
async def analyze_dataset(file: UploadFile = File(...)):
    #CSVファイルが確認
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="CSVファイルをアップロードしてください。",
        )

    #ファイルを読み込む
    content = await file.read()

    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="ファイルサイズは10MB以下にしてください。",
        )

    try:
        #CSVをDataFrameに変換
        df = pd.read_csv(BytesIO(content))

        if df.empty:
            raise HTTPException(
                status_code=400,
                detail="CSVにデータ行がありません。",
            )

        #基本情報
        rows = len(df)
        columns = len(df.columns)
        missing_values = int(df.isna().sum().sum())

        #数値列の統計情報
        numeric_status = {}

        numeric_df = df.select_dtypes(include="number")

        for column in numeric_df.columns:
            series = numeric_df[column].dropna()

            if series.empty:
                continue

            numeric_status[column] = {
                "count": int(series.count()),
                "mean": float(series.mean()),
                "median": float(series.median()),
                "std": (
                    float(series.std(ddof=0))
                    if len(series) > 1
                    else 0.0
                ),
                "min": float(series.min()),
                "max": float(series.max()),
            }

        #列ごとの欠損値
        missing_by_column = {
            str(column): int(count)
            for column, count in df.isna().sum().items()
        }

        return {
            "filename": file.filename,
            "rows": rows,
            "columns": columns,
            "missing_values": missing_values,
            "numeric_columns": numeric_status,
            "missing_by_column": missing_by_column,
        }

    except HTTPException:
        raise

    except (ValueError, UnicodeError, pd.errors.ParserError) as error:
        raise HTTPException(
            status_code=400,
            detail=f"CSVの読み込みに失敗しました: {error}",
        )
