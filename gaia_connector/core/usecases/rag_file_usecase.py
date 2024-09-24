from flask import jsonify, request

from core.domain.constants import Constants
from core.domain.entities.rag_file import RAGFile
from core.services.receiver.rag_service import RagFileHandlerService
from infrastructure.kafka_producer.producer import publish_message
from kernel.configs.load_env import load_bucket_config


class RAGFileUsecase:
    def __init__(self):
        self.service = RagFileHandlerService()
        
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
            
            id = self.service.insert_file_to_database(rag_file)
            print("Stored rag file in local storage and database with id:", id) 
            
            try:
                json_rag_file = rag_file.to_dict()
                publish_message(Constants.KafkaTopic.UPLOAD_RAG_FILE, Constants.KafkaCommand.GAIA_INIT_UPLOAD_FILE, json_rag_file) 
            except Exception as e:
                print("Could not produce message to kafka")
                return jsonify({
                    Constants.StringConstants.status: 'OK',
                    Constants.StringConstants.message: 'Init RAG file successfully in local but can upload to Data Storage',
                })

            return jsonify({
                Constants.StringConstants.status: 'OK',
                Constants.StringConstants.message: 'Init RAG file successfully',
                'file_id': id 
            }), 200
            
        except Exception as e:
            print('Cannot create RAG file:', e)
            return jsonify({
                Constants.StringConstants.status: 'ERROR',
                Constants.StringConstants.message: 'Cannot init RAG file'
            }), 500

    def upload_rag_file(self, data):
        """
            Upload file to data storage
        :param data: store file id and file name
        :return: boolean status result
        """
        try:
            file_id = data.get('file_id')
            file_name = data.get('file_name')
            bucket_name = load_bucket_config() 
            
            failed_case = self.service.handle_upload_file(file_id, file_name, bucket_name)
            if failed_case is False:
                return False
            
            self.service.update_rag_file_status(file_id, Constants.Status.SUCCESS)
            return True
        except Exception as e:
            print("Cannot upload to storage")
            

    def update_rag_file(self, data):
        pass

    def delete_rag_file(self, data):
        pass

    def view_rag_file(self, data):
        pass 