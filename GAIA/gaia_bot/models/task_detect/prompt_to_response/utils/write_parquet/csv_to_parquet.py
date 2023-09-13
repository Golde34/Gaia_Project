import pandas as pd
import fastparquet

from prompt_to_response.config import DATA_CSV_FILE, DATA_PARQUET_FILE


def write_parquet_file():
    df = pd.read_csv(DATA_CSV_FILE, encoding='utf-8')
    df.to_parquet(DATA_PARQUET_FILE, engine='fastparquet')

def display_parquet_data():
    df = pd.read_parquet(DATA_PARQUET_FILE, engine='fastparquet')
    # print(df)