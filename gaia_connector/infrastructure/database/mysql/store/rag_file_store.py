from core.domain.entities.rag_file import RAGFile
from infrastructure.database.mysql.database_connection import DatabaseConnection as db
from infrastructure.database.mysql.database_query import DatabaseQuery as db_query


class RAGFileStore:
    def __init__(self) -> None:
        self.db = db()
        self.connection = self.db.connect()

    def create(self, rag_file: RAGFile) -> None:
        field = ["file_name", "file_path", "created_at", "updated_at"]
        value = [rag_file.file_name, rag_file.file_path, rag_file.created_at, rag_file.updated_at]
        query = db_query(field, value)
        query = query.create_query()
        self.connection.execute(query)
        self.connection.commit()

    def update(self, rag_file: RAGFile) -> None:
        field = ["file_name", "file_path", "updated_at"]
        value = [rag_file.file_name, rag_file.file_path, rag_file.updated_at]
        query = db_query(field, value)
        query = query.update_query()
        self.connection.execute(query)
        self.connection.commit()

    def delete(self, rag_file: RAGFile) -> None:
        field = ["file_name"]
        value = [rag_file.file_name]
        query = db_query(field, value)
        query = query.delete_query()
        self.connection.execute(query)
        self.connection.commit()

    def select(self, rag_file: RAGFile) -> None:
        field = ["file_name"]
        value = [rag_file.file_name]
        query = db_query(field, value)
        query = query.select_query()
        self.connection.execute(query)
        self.connection.commit()

    def __del__(self) -> None:
        self.connection.close()
        self.db.disconnect()
