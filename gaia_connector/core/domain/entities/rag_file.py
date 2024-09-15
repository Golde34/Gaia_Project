class RAGFile:
    def __init__(self, file_id: str, file_name: str, file_path: str, file_type: str, file_size: int, file_hash: str):
        self.file_id = file_id
        self.file_name = file_name
        self.file_path = file_path
        self.file_type = file_type
        self.file_size = file_size
        self.file_hash = file_hash

    def __str__(self):
        return f"RAGFile: {self.file_id} {self.file_name} {self.file_path} {self.file_type} {self.file_size} {self.file_hash}"