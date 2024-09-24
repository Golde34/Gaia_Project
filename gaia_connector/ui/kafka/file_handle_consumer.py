from ui import bus
from core.domain.constants import Constants
from core.usecases.rag_file_usecase import RAGFileUsecase


@bus.handle(Constants.KafkaTopic.UPLOAD_RAG_FILE)
def upload_rag_file(consumer, msg):
    return RAGFileUsecase.upload_rag_file(msg.value())