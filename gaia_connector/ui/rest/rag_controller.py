from flask import request, jsonify

from ui import app
from core.usecases.rag_file_usecase import RAGFileUsecase

@app.route('/rag-file/upload', methods=['POST'])
def create_rag_file():
    files = request.files
    return RAGFileUsecase().upload_rag_file(files)

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