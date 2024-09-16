from flask import jsonify, request
import os
import uuid

from core.domain.constants import Constants
from kernel.utils.file_handler import allowed_file, compute_file_hash, get_file_size
from core.domain.entities.rag_file import RAGFile

class RAGFileUsecase:
    def __init__(self):
        pass

    def upload_rag_file(self, file):
        """
            Create rag file in local storage
            Push kafka to gaia pipeline to store this file
        :param data: data from request
        :param files: file from request
        :return: final rag file json object
        """ 
        try:
            # Kiểm tra nếu file được phép
            if not allowed_file(file.filename):
                return jsonify({
                    Constants.StringConstants.status: 'ERROR',
                    Constants.StringConstants.message: 'File is not allowed'
                }), 400

            # Check if the POST request contains the 'file' part

            file = request.files['file']

            # Check if a file is selected
            if file.filename == '':
                return jsonify({'status': 'ERROR', 'message': 'No selected file'}), 400

            # Save the file to the UPLOAD_FOLDER
            # Tạo một ID duy nhất cho file
            file_id = str(uuid.uuid4())
            
            # Tính hash của file (ví dụ: SHA256)
            file_hash = compute_file_hash(file)
            
            # Lấy thuộc tính file
            file_name = file.filename
            file_type = file.content_type
            file_size = get_file_size(file)
            
            # Định nghĩa đường dẫn để lưu file
            file_path = os.path.join('local_storage', f"{file_id}_{file_name}")
            
            # Đảm bảo thư mục lưu trữ tồn tại
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            
            # Lưu file vào lưu trữ cục bộ
            file.save(file_path)
            
            # Tạo đối tượng RAGFile
            rag_file = RAGFile(
                file_id=file_id,
                file_name=file_name,
                file_path=file_path,
                file_type=file_type,
                file_size=file_size,
                file_hash=file_hash
            )
            
            # Lưu đối tượng RAGFile vào cơ sở dữ liệu
            # db_session.add(rag_file)
            # db_session.commit()
            
            # Đẩy dữ liệu qua Kafka đến pipeline của GAIA
            # Thực hiện logic Kafka producer tại đây
            # Ví dụ:
            # kafka_producer.send('gaia_pipeline_topic', {'file_id': file_id, 'file_path': file_path})
            
            # Trả về phản hồi thành công
            return jsonify({
                Constants.StringConstants.status: 'OK',
                Constants.StringConstants.message: 'Create RAG file successfully',
                'file_id': file_id
            }), 200
        except Exception as e:
            print('Cannot create RAG file:', e)
            return jsonify({
                Constants.StringConstants.status: 'ERROR',
                Constants.StringConstants.message: 'Cannot create RAG file'
            }), 500

    def store_rag_file(self, data):
        pass

    def update_rag_file(self, data):
        pass

    def delete_rag_file(self, data):
        pass

    def view_rag_file(self, data):
        pass 