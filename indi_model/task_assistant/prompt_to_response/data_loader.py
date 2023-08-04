import prompt_to_response.utils.write_parquet.add_to_parquet as atp
from data_processing import DataProcessing


def data_loader(config):
    data = atp.load_parquet(config.DATA_PARQUET_FILE)
    return data

def return_data(config):
    data = data_loader(config=config)
    data = DataProcessing(data).pre_data
    return data

# if __name__ == '__main__':
#     data = data_loader(config=config)
#     data = DataProcessing(data).pre_data
#     print(data)