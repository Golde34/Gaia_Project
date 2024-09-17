from core.domain.entities.rag_file import RAGFile
from infrastructure.database.mysql.database_connection import DatabaseConnection as db
from infrastructure.database.mysql.database_query import DatabaseQuery as db_query


class RAGFileStore:
    def __init__(self) -> None:
        self.db = db()
        self.connection = self.db.connect()

    def create_rag_file(self, rag_file: RAGFile):
        query = db_query()
        fields = ['file_id', 'file_name', 'file_path', 'file_type', 'file_size', 'file_hash', 'status']
        values = [rag_file.file_id, rag_file.file_name, rag_file.file_path, rag_file.file_type, rag_file.file_size, rag_file.file_hash, rag_file.status]
        query.create_query('rag_file', fields, values, self.connection)
        id = self.db.execute_insert_query(query)
        return id

    def update_rag_file(self, rag_file: RAGFile):
        query = db_query()
        fields = ['file_name', 'file_path', 'file_type', 'file_size', 'file_hash', 'status']
        values = [rag_file.file_name, rag_file.file_path, rag_file.file_type, rag_file.file_size, rag_file.file_hash, rag_file.status]
        condition = f"file_id = '{rag_file.file_id}'"
        query.update_query('rag_file', fields, values, condition, self.connection)
        self.db.execute_query(query)

    def delete_rag_file(self, file_id: str):
        query = db_query()
        condition = f"file_id = '{file_id}'"
        query.delete_query('rag_file', condition, self.connection)
        self.db.execute_query(query)

    def view_rag_file(self, file_id: str):
        query = db_query()
        condition = f"file_id = '{file_id}'"
        result = query.select_query('rag_file', condition, self.connection)
        return result
    
    def view_all_rag_files(self):
        query = db_query()
        result = query.select_query('rag_file', '', self.connection)
        return result
    
    def view_rag_file_by_name(self, file_name: str):
        query = db_query()
        condition = f"file_name = '{file_name}'"
        result = query.select_query('rag_file', condition, self.connection)
        return result
    
    def view_rag_file_by_hash(self, file_hash: str):
        query = db_query()
        condition = f"file_hash = '{file_hash}'"
        result = query.select_query('rag_file', condition, self.connection)
        return result
    