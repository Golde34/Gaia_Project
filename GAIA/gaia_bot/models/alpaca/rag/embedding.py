from sentence_transformers import SentenceTransformer, util
import numpy as np


embedding_model_name = "distilbert-base-nli-stsb-mean-tokens"
model = SentenceTransformer(embedding_model_name)

def create_embeddings(texts, device='cpu'):
    """
    Create embeddings for a list of texts.
    
    :param texts: List of sentences.
    :return: A tensor containing the embeddings.
    """
    if not texts:
        raise ValueError("The input texts list is empty. Please provide valid text.")
    
    embeddings = model.encode(texts, device=device, convert_to_tensor=True)
    
    return embeddings

def rerank(device, query, candidates):
    """
    Perform reranking of candidates based on cosine similarity with the query.
    --------------------------------------
    Exception                                 Traceback (most recent 
    :param query: The query sentence.
    :param candidates: List of sentences to rerank.
    :return: List of candidates reranked by similarity.
    """
    # Move model to the specified device (if applicable)
    model.to(device)

    # Create embeddings for the query and candidates
    query_embedding = create_embeddings([query], device)
    candidate_embeddings = create_embeddings(candidates, device)
    
    # Calculate cosine similarity
    cosine_scores = util.pytorch_cos_sim(query_embedding, candidate_embeddings)[0]
    
    # Sort indices by descending similarity scores
    ranked_indices = np.argsort(cosine_scores.numpy())[::-1]
    
    # Return the candidates sorted by similarity
    reranked_candidates = [candidates[idx] for idx in ranked_indices]
    
    return reranked_candidates
