from core.domain.constants import Constants


class FileMapper:
    def __init__(self) -> None:
        pass
    
    def map_failed_rag_file(self, file_id: str, file_name: str, message: str):
        return {
            'fileId': file_id,
            'fileName': file_name,
            'status': Constants.Status.FAILED,
            'message': message 
        }