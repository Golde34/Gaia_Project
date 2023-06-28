import pandas as pd
import pyarrow.parquet as pq
import os


DATA_FILE_1 = 'nomic_ai_parquet1.parquet'
DATA_FILE_2 = "nomic_ai_parquet2.parquet"
DATA_FILE_3 = "nomic_ai_parquet3.parquet"
DATA_FILE_4 = "nomic_ai_parquet4.parquet"

DATA_FILES = [DATA_FILE_1, DATA_FILE_2, DATA_FILE_3, DATA_FILE_4]


def split_parquet_file(data_file):
    parquet_file = pq.ParquetFile(data_file)

    num_row_groups = parquet_file.num_row_groups
    num_rows = 0
    for i in range(num_row_groups):
        num_rows += parquet_file.metadata.row_group(i).num_rows

    for i in range(num_row_groups):
        df = parquet_file.read_row_group(i).to_pandas()
        # 100 element per file
        df_slice = df[1:999]

        df_slice.to_csv(f'data/{data_file}_{i}.csv', index=False)
        write_parquet_file(f'data/{data_file}_{i}.csv',
                           f'data/{data_file}_{i}.parquet')

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
    # for file in DATA_FILES:
    #     split_parquet_file(file)
    display_parquet_data('data/nomic_ai_parquet1.parquet_2.parquet')