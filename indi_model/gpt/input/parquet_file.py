import pandas as pd
import pyarrow.parquet as pq
import os


DATA_PATH = ''
DATA_FILE_1 = DATA_PATH + 'nomic_ai_parquet1.parquet'


def slit_parquet_file():
    parquet_file = pq.ParquetFile(DATA_FILE_1)

    num_row_groups = parquet_file.num_row_groups
    num_rows = 0
    for i in range(num_row_groups):
        num_rows += parquet_file.metadata.row_group(i).num_rows

    for i in range(num_row_groups):
        df = parquet_file.read_row_group(i).to_pandas()
        # 100 element per file
        df_slice = df[1:999]

        df_slice.to_csv(f'data/output_{i}.csv', index=False)
        write_parquet_file(f'data/output_{i}.csv', f'data/output_{i}.parquet')

def write_parquet_file(from_file, to_file):
    df = pd.read_csv(from_file, encoding='utf-8')
    df.to_parquet(to_file, engine='fastparquet')
    if os.path.exists(from_file) and os.path.isfile(from_file):
        os.remove(from_file)
    else:
        print('file not found')

def display_parquet_data(to_file):
    df = pd.read_parquet(to_file, engine='fastparquet')
    print(df)

if __name__ == "__main__":
    # slit_parquet_file()
    display_parquet_data(f'data/output_{99}.parquet')