from core.domain.entities.rag_file import RAGFile
from infrastructure.database.mysql.database_connection import DatabaseConnection as db
from infrastructure.database.mysql.database_query import DatabaseQuery as db_query


class RAGFileStore:
    def __init__(self) -> None:
        self.db = db()

    def create_rag_file(self, rag_file: RAGFile):
        fields = ['file_id', 'file_name', 'file_path', 'file_type', 'file_size', 'file_hash', 'status']
        values = [rag_file.file_id, rag_file.file_name, rag_file.file_path, rag_file.file_type, rag_file.file_size, rag_file.file_hash, rag_file.status]
        query = db_query(fields, values).create_query('rag_file')
        id = self.db.execute_insert_query(query)
        return id

    def update_rag_file(self, rag_file: RAGFile):
        fields = ['file_name', 'file_path', 'file_type', 'file_size', 'file_hash', 'status']
        values = [rag_file.file_name, rag_file.file_path, rag_file.file_type, rag_file.file_size, rag_file.file_hash, rag_file.status]
        condition = f"file_id = '{rag_file.file_id}'"
        query = db_query(fields, values).update_query('rag_file', condition)
        self.db.execute_query(query)

    def delete_rag_file(self, file_id: str):
        condition = f"file_id = '{file_id}'"
        query = db_query().delete_query('rag_file', condition)
        self.db.execute_query(query)

    def check_existed_rag_file(self, file_id: str, file_name: str):
        condition = f"file_id = '{file_id}' AND file_name = '{file_name}'"
        query = db_query().select_query('rag_file', condition)
        result = self.db.execute_query(query)
        if result: return True
        return False
    
    def upadate_rag_file_status(self, file_id: str, status: str):
        fields = ['status']
        values = [status]
        condition = f"file_id = '{file_id}'"
        query = db_query(fields, values).update_query('rag_file', condition)
        self.db.execute_query(query)
    
    def view_rag_file(self, file_id: str):
        condition = f"file_id = '{file_id}'"
        query = db_query().select_query('rag_file', condition)
        result = self.db.execute_query(query)
        return result
    
    def view_all_rag_files(self):
        query = db_query().select_query('rag_file', '')
        result = self.db.execute_query(query)
        return result
    
    def view_rag_file_by_name(self, file_name: str):
        condition = f"file_name = '{file_name}'"
        query = db_query().select_query('rag_file', condition)
        result = self.db.execute_query(query)
        return result
    
    def view_rag_file_by_hash(self, file_hash: str):
        condition = f"file_hash = '{file_hash}'"
        query = db_query().select_query('rag_file', condition)
        result = self.db.execute_query(query)
        return result
    