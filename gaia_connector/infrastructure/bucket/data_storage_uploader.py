import os

from core.domain.constants import Constants


class DataStorageUploader:
    def __init__(self) -> None:
        pass
    
    def store_in_local(self, file, file_id, file_name):
        file_path = os.path.join(Constants.FileExtensions.LOCAL_RESOURCE, f"{file_id}_{file_name}")
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        file.save(file_path)
        return file_path

    def check_existed_file_in_local(self, file_path):
        return os.path.exists(os.path.join(Constants.FileExtensions.LOCAL_RESOURCE, file_path))

    def upload(self, bucket_name, file_path):
        # Get file from local storage
        file = open(os.path.join(Constants.FileExtensions.LOCAL_RESOURCE, file_path), 'rb')

        if bucket_name == Constants.BucketName.LOCAL:
            return self._upload_to_local_datalake(file)
        if bucket_name == Constants.BucketName.S3:
            return self._upload_to_s3(file)
        if bucket_name == Constants.BucketName.HADOOP:
            return self._upload_to_hadoop(file)
        return False

    def _upload_to_local_datalake(self, file):
        file_path = os.path.join(Constants.FileExtensions.LOCAL_DATALAKE, file.name)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'wb') as f:
            f.write(file.read())
        return True
    
    def _upload_to_s3(self, file):
        # Upload file to S3
        return True
    
    def _upload_to_hadoop(self, file):
        # Upload file to Hadoop
        # hadoop = HadoopConnector()
        # hadoop.upload(file)
        return True