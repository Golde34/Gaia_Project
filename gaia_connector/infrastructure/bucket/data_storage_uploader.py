import os

from core.domain.constants import Constants


class DataStorageUploader:
    def __init__(self) -> None:
        pass
    
    def upload(file, bucket_name):
        pass

    def store_in_local(self, file, file_id, file_name):
        file_path = os.path.join(Constants.FileExtensions.LOCAL_RESOURCE, f"{file_id}_{file_name}")
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        file.save(file_path)
        return file_path