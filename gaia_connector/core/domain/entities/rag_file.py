import time

from infrastructure.database.mysql.database_annotation import database


@database('rag_file')
class RAGFile:
    file_id: str
    file_name: str
    file_path: str
    file_type: str
    file_size: int
    file_hash: str
    status: str
    
    def __init__(self, file_id: str, file_name: str, file_path: str, file_type: str, file_size: int, file_hash: str, status: str):
        self.file_id = file_id
        self.file_name = file_name
        self.file_path = file_path
        self.file_type = file_type
        self.file_size = file_size
        self.file_hash = file_hash
        self.created_at = time.time()
        self.status = status

    def __str__(self):
        return f"RAGFile({self.file_id}, {self.file_name}, {self.file_path}, {self.file_type}, {self.file_size}, {self.file_hash}, {self.created_at}, {self.status})"

    def to_dict(self):
        return {
            "file_id": self.file_id,
            "file_name": self.file_name,
            "file_path": self.file_path,
            "file_type": self.file_type,
            "file_size": self.file_size,
            "file_hash": self.file_hash,
            "created_at": self.created_at,
            "status": self.status
        }