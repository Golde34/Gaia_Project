class RAGFileUsecase:
    def __init__(self, repository):
        self.repository = repository

    def get_rag_file(self, file_id):
        return self.repository.get_rag_file(file_id)

    def create_rag_file(self, file):
        return self.repository.create_rag_file(file)

    def update_rag_file(self, file_id, file):
        return self.repository.update_rag_file(file_id, file)

    def delete_rag_file(self, file_id):
        return self.repository.delete_rag_file(file_id)