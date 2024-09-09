from sentence_transformers import SentenceTransformer


embedding_model_name = "distilbert-base-nli-stsb-mean-tokens"
model = SentenceTransformer(embedding_model_name)

def embed(texts, device='cpu'):
    """
    Create embeddings for a list of texts.
    
    :param texts: List of sentences.
    :return: A numpy array containing the embeddings.
    """
    return model.encode(texts, device=device, convert_to_tensor=True)

def rerank(query, candidates):
    """
    Perform reranking of candidates based on cosine similarity with the query.
    
    :param query: The query sentence.
    :param candidates: List of sentences to rerank.
    :return: List of candidates reranked by similarity.
    """
    query_embedding = create_embeddings([query])
    candidate_embeddings = create_embeddings(candidates)
    
    cosine_scores = util.pytorch_cos_sim(query_embedding, candidate_embeddings)[0]
    ranked_indices = np.argsort(cosine_scores.numpy())[::-1]
    reranked_candidates = [candidates[idx] for idx in ranked_indices]
    return reranked_candidates