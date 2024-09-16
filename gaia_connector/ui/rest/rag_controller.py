from flask import request, jsonify
import os

from ui import app
from core.usecases.rag_file_usecase import RAGFileUsecase

@app.route('/rag-file/upload', methods=['POST'])
def create_rag_file():
    print(request.files)
    file = request.files['file']
    return RAGFileUsecase().upload_rag_file(file)

# def upload_rag_file():
#     # Debugging: Check what Flask is receiving
#     print(f"Request Content-Type: {request.content_type}")
#     print(f"Request files: {request.files}")

#     # Check if the file is in the request
#     if 'file' not in request.files:
#         return jsonify({'status': 'ERROR', 'message': 'No file part in the request'}), 400

#     file = request.files['file']

#     # Additional check to see if the filename is empty
#     if file.filename == '':
#         return jsonify({'status': 'ERROR', 'message': 'No selected file'}), 400

#     # Save the file
#     file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
#     file.save(file_path)

#     return jsonify({
#         'status': 'OK',
#         'message': 'File uploaded successfully',
#         'file_path': file_path
#     }), 200


@app.route('/rag-file/update', methods=['PUT'])
def update_rag_file():
    data = request.get_json()
    return RAGFileUsecase().update_rag_file(data)

@app.route('/rag-file/delete', methods=['DELETE'])
def delete_rag_file():
    data = request.get_json()
    return RAGFileUsecase().delete_rag_file(data)

@app.route('/rag-file/view', methods=['GET'])
def view_rag_file():
    data = request.get_json()
    return RAGFileUsecase().view_rag_file(data)