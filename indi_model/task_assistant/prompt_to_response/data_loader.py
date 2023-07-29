import data.write_parquet.add_to_parquet as atp
import config
from data_processing import DataProcessing


def data_loader(config):
    data = atp.load_parquet(config.DATA_FILE)
    return data


if __name__ == '__main__':
    data = data_loader(config=config)
    data = DataProcessing(data).pre_data
    print(data)