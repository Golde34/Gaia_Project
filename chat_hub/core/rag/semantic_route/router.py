import numpy as np
from llama_index.embeddings.huggingface import HuggingFaceEmbedding 
from dotenv import load_dotenv
import os


load_dotenv()

class SemanticRouter():
    def __init__(self, routes):
        self.routes = routes
        self.embedding_model = HuggingFaceEmbedding(model_name=os.getenv("EMBEDDING_MODEL"))
        self.routesEmbedding = {}
        self.routesEmbeddingCal = {}

        for route in self.routes:
            self.routesEmbedding[route.name] = self.embedding_model.encode(route.samples)

        for route in self.routes:
            self.routesEmbeddingCal[route.name] = self.routesEmbedding[route.name] / np.linalg.norm(self.routesEmbedding[route.name])
    
    def get_routes(self):
        return self.routes
    
    def guide(self, query):
        query_embedding = self.embedding_model.encode([query])
        query_embedding = query_embedding / np.linalg.norm(query_embedding)
        scores = []

        for route in self.routes:
            routeEmbeddingCal = self.routesEmbeddingCal[route.name]
            score = np.mean(np.dot(query_embedding, routeEmbeddingCal.T).flatten())
            scores.append(score)

        scores.sort(reverse=True)
        return scores[0] # return the highest score