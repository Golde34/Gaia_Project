from werkzeug.datastructures import FileStorage
import uuid
import os
from flask import jsonify

from kernel.utils.file_handler import compute_file_hash, get_file_size, allowed_file
from core.domain.entities.rag_file import RAGFile 
from core.domain.constants import Constants


class RagFileHandlerService:
    def __init__(self) -> None:
        pass

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
        
        file_path = os.path.join('local_storage', f"{file_id}_{file_name}")
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        file.save(file_path)

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
         