from core.domain.entities.rag_file import RAGFile
from infrastructure.database.mysql.database_connection import DatabaseConnection as db


class RAGFileStore:
    def __init__(self, rag_file: RAGFile):
        self.rag_file = rag_file

    def save(self):
        db.execute_insert_query(f"INSERT INTO rag_file (file_id, file_name, file_path, file_type, file_size, file_hash) VALUES ('{self.rag_file.file_id}', '{self.rag_file.file_name}', '{self.rag_file.file_path}', '{self.rag_file.file_type}', {self.rag_file.file_size}, '{self.rag_file.file_hash}')")
        