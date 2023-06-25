from data.write_parquet import csv_to_parquet
import pandas as pd
import csv


def add_to_dataset(prompt, response, tag, csv_file):
    data = [prompt, response, tag]

    with open(csv_file, 'a', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(data)
        f.close()

def append_data_to_parquet(prompt, response, tag, csv_file):
    add_to_dataset(prompt, response, tag, csv_file)
    csv_to_parquet.write_parquet_file()
    csv_to_parquet.display_parquet_data()

def load_parquet(parquet_file):
    df = pd.read_parquet(parquet_file, engine='fastparquet')
    # print(df)
    return df


# if __name__ == "__main__":
#     append_data_to_parquet('test prompt', 'test response', 'test tag', '../data.csv')