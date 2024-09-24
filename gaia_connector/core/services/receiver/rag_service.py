from werkzeug.datastructures import FileStorage
import uuid
import os
from flask import jsonify

from kernel.utils.file_handler import compute_file_hash, get_file_size, allowed_file
from core.domain.entities.rag_file import RAGFile 
from core.domain.constants import Constants
from infrastructure.bucket.data_storage_uploader import DataStorageUploader
from infrastructure.store.rag_file_store import RAGFileStore
from core.services.mapper.file_mapper import FileMapper
from infrastructure.kafka_producer.producer import publish_message


class RagFileHandlerService:
    def __init__(self):
        self.bucket_handler = DataStorageUploader()
        self.store = RAGFileStore()

    def validate_file(self, file: FileStorage):
        if not allowed_file(file.filename):
            return jsonify({
                Constants.StringConstants.status: 'ERROR',
                Constants.StringConstants.message: 'File is not allowed'
            }), 400
            
        if file.filename == '':
            return jsonify({
                Constants.StringConstants.status: 'ERROR',
                Constants.StringConstants.message: 'No selected file'
            }), 400
        return jsonify({
            Constants.StringConstants.status: 'OK',
            Constants.StringConstants.message: 'Validate OK'
        }), 200

    def store_rag_file_in_local(self, file: FileStorage, status) -> RAGFile:
        file_id = str(uuid.uuid4())
        file_hash = compute_file_hash(file)
        
        file_name = file.filename
        file_type = file.content_type
        file_size = get_file_size(file)
       
        self.bucket_handler.store_in_local(file, file_id, file_name)
        
        rag_file = RAGFile(
            file_id=file_id,
            file_name=file_name,
            file_path=file_path,
            file_type=file_type,
            file_size=file_size,
            file_hash=file_hash,
            status=status
        )
        return rag_file

    def handle_upload_file(self, file_id, file_name, bucket_name):
        existed_rag_file = self.store.check_existed_rag_file(file_id, file_name)
        if existed_rag_file is False:
            print("RAG file does not exist in database")
            self._push_failed_kafka_message(file_id, file_name, "RAG file does not exist in database")
            return False
         
        uploaded_rag_file = self.upload_rag_file_to_data_storage(file_id, file_name, bucket_name)
        if uploaded_rag_file is False:
            print("Cannot upload RAG file to data storage")
            self._push_failed_kafka_message(file_id, file_name, "Cannot upload RAG file to data storage")
            return False
        
        return True
        
    def _push_failed_kafka_message(self, file_id, file_name, message: str):
        failed_upload_file = FileMapper().map_failed_rag_file(file_id, file_name, message)
        publish_message(Constants.KafkaTopic.UPLOAD_RAG_FILE, Constants.KafkaCommand.GAIA_FAILED_UPLOAD_FILE, failed_upload_file)
    
    def upload_rag_file_to_data_storage(self, file_id, file_name, bucket_name: str) -> bool:
        try:
            # Check file id and file name in database and local storage
            # If not exist, return False
            
            self.bucket_handler.upload(bucket_name)
            return True
        except Exception as e:
            print('Cannot upload RAG file:', e)
            return False
        
    def insert_file_to_database(self, rag_file: RAGFile) -> int:
        return self.store.create_rag_file(rag_file)
   
    def update_rag_file_status(self, file_id: str, status: str):
        self.store.upadate_rag_file_status(file_id, status)
