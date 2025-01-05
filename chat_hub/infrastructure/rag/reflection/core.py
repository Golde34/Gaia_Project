import json
import uuid
import chromadb
from chromadb.config import Settings
from chromadb.utils import embedding_functions
import os
from dotenv import load_dotenv


load_dotenv()

class ReflectionCore():
    def __init__(self,
        llm,
        db_path,
        db_chat_history_collection,
        semantic_cache_collection
    ):
        self.client = chromadb.PersistentClient(path=db_path)
        self.history_collection = self.client.get_or_create_collection(
            name=db_chat_history_collection, embedding_function=os.getenv("EMBEDDING_MODEL"))
        self.semantic_cache_collection = self.client.get_or_create_collection(
            name=semantic_cache_collection, embedding_function=os.getenv("EMBEDDING_MODEL"))
        self.llm = llm
        self.db_chat_history_collection = db_chat_history_collection

    
