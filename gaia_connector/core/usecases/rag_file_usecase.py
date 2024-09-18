from flask import jsonify, request

from core.domain.constants import Constants
from core.domain.entities.rag_file import RAGFile
from core.services.receiver.rag_service import RagFileHandlerService
from infrastructure.store.rag_file_store import RAGFileStore
from infrastructure.kafka_producer.producer import publish_message


class RAGFileUsecase:
    def __init__(self):
        self.service = RagFileHandlerService() 
        self.store = RAGFileStore()

    def create_rag_file(self, file):
        """
            Create rag file in local storage
            Push kafka to init action in Gaia pipeline to store file
        :param file: file from request
        :return: final rag file json object
        """ 
        try:
            error_result, error_code = self.service.validate_file(file)
            if error_code == 400: return error_result 
            
            rag_file = self.service.store_rag_file_in_local(file, Constants.Status.INIT)
            
            id = self.store.create_rag_file(rag_file)
            print("Stored rag file in local storage and database with id:", id) 
            
            try:
                publish_message(Constants.KafkaTopic.UPLOAD_RAG_FILE, Constants.KafkaCommand.GAIA_INIT_UPLOAD_FILE, rag_file) 
            except Exception as e:
                print("Could not produce message to kafka")
                raise Exception("Could not produce message to kafka")
                
            return jsonify({
                Constants.StringConstants.status: 'OK',
                Constants.StringConstants.message: 'Create RAG file successfully',
                'file_id': id 
            }), 200
            
        except Exception as e:
            print('Cannot create RAG file:', e)
            return jsonify({
                Constants.StringConstants.status: 'ERROR',
                Constants.StringConstants.message: 'Cannot create RAG file'
            }), 500

    def _store_rag_file_in_local(self, data): 
        pass

    def upload_rag_file(self, data):
        pass

    def update_rag_file(self, data):
        pass

    def delete_rag_file(self, data):
        pass

    def view_rag_file(self, data):
        pass 