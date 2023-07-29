import pandas as pd
import fastparquet


def write_parquet_file():
    df = pd.read_csv('../data.csv', encoding='utf-8')
    df.to_parquet('../data.parquet', engine='fastparquet')

def display_parquet_data():
    df = pd.read_parquet('../data.parquet', engine='fastparquet')
    print(df)