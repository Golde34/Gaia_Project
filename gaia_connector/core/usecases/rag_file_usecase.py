from flask import jsonify, request

from core.domain.constants import Constants
from kernel.utils.file_handler import allowed_file, compute_file_hash, get_file_size
from core.domain.entities.rag_file import RAGFile
from core.services.receiver.rag_service import RagFileHandlerService
from infrastructure.store.rag_file_store import RAGFileStore

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
            if not allowed_file(file.filename):
                return jsonify({
                    Constants.StringConstants.status: 'ERROR',
                    Constants.StringConstants.message: 'File is not allowed'
                }), 400


            file = request.files['file']
            if file.filename == '':
                return jsonify({'status': 'ERROR', 'message': 'No selected file'}), 400
            
            rag_file = self.service.store_rag_file_in_local(file, Constants.Status.INIT)
            
            id = self.store.create_rag_file(rag_file)
            print(rag_file.file_id == id) 
            print("Stored rag file in local storage and database with id:", id) 

            # Đẩy dữ liệu qua Kafka đến pipeline của GAIA
            # kafka_producer.send('gaia_pipeline_topic', {'file_id': file_id, 'file_path': file_path})
            
            # Trả về phản hồi thành công
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