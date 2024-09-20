import chromadb
from transformers import AutoModelForSequenceClassification
import copy

from gaia_bot.models.alpaca.rag import embedding
from langchain_text_splitters import RecursiveCharacterTextSplitter
from gaia_bot.kernel.configs.settings import CHROMADB_COLLECTION_NAME

CHROMA_CLIENT = chromadb.PersistentClient(path='vectordb')
COLLECTION = CHROMA_CLIENT.get_or_create_collection(name = CHROMADB_COLLECTION_NAME, 
                                                    metadata={"hnsw:space": "cosine"})

TEXT_SPLITTER = RecursiveCharacterTextSplitter(
    chunk_size=1014,
    chunk_overlap=256,
    length_function=len,
    is_separator_regex=False,
)

def add_texts_to_vectordb(texts, metadatas, device):
    
    for i in range(len(texts)):
        splited_texts = TEXT_SPLITTER.split_text(texts[i])
        file_id = metadatas[i]['file_id']
        ids = [file_id + "_" + str(j) for j in range(len(splited_texts))]
        
        # Get embeddings from chunks
        embeddings = embedding.create_embeddings(splited_texts, device)  # Use the create_embeddings function
        
        file_metadatas = [copy.deepcopy(metadatas[i]) for _ in range(len(splited_texts))]
        
        # Apply sentence window to save bigger context in a chunk
        for idx in range(len(file_metadatas)):
            if idx == 0:
                sentence_window_doc = splited_texts[0] + '\n' + splited_texts[1]
            elif idx == len(splited_texts) - 1:
                sentence_window_doc = splited_texts[-2] + '\n' + splited_texts[-1]
            else:
                sentence_window_doc = splited_texts[idx - 1] + '\n' + splited_texts[idx] + '\n' + splited_texts[idx + 1]
                
            file_metadatas[idx]['sentence_window_document'] = sentence_window_doc
        
        # Add data to vector DB
        COLLECTION.add(
            ids=ids,
            documents=splited_texts,
            embeddings=embeddings,
            metadatas=file_metadatas
        )
    
        print(f"\n===== ADD {len(splited_texts)} DOCUMENTS TO VECTORDB ===============")
        print("Length original text:", len(texts[i]))
        print("Metadatas:", file_metadatas[0])
   
        
def query_vectordb(query, device, n_vectordb=10, n_rerank=3):
    
    # Get embedding from user's query
    query_embedding = embedding.create_embeddings([query])  # Use the create_embeddings function
    
    # Query in vector DB
    vectordb_results = COLLECTION.query(
        query_embeddings=query_embedding,
        n_results=n_vectordb
    )

    sentence_window_documents = [t['sentence_window_document'] for t in vectordb_results['metadatas'][0]]
    file_names = [t['file_name'] for t in vectordb_results['metadatas'][0]]
    
    sim_sentences = vectordb_results['documents'][0]

    # Rerank the results using cosine similarity
    reranked_sentences = embedding.rerank(device,  query, sim_sentences)  # Use the rerank function defined earlier
    
    # Get the scores for reranked sentences
    rerank_scores = []
    for sentence in reranked_sentences:
        idx = sim_sentences.index(sentence)
        score = vectordb_results['distances'][0][idx]  # Use original distances for scoring
        rerank_scores.append(score)

    final_results = {
        'documents': [sentence_window_documents[sim_sentences.index(s)] for s in reranked_sentences[:n_rerank]],
        'scores': rerank_scores[:n_rerank],
        'file_names': [file_names[sim_sentences.index(s)] for s in reranked_sentences[:n_rerank]]
    }
    
    print("\n===== VECTORDB QUERY RESULTS ==============")
    for sentence, score in zip(final_results['documents'], final_results['scores']):
        print(f"\n=== Documents ({score}):", sentence)

    return final_results

def get_all_from_vectordb():
    all_data = COLLECTION.get(
        include=['documents', 'metadatas']
    )
    
    return all_data

def delete_from_vectordb(delete_id):
    ids_to_delete = []
    
    all_data = COLLECTION.get()
    
    # Get all data where "file_id" in metadatas equals delete_id
    for idx in range(len(all_data['ids'])):
        id = all_data['ids'][idx]
        metadata = all_data['metadatas'][idx]
        
        if metadata['file_id'] == delete_id:
            ids_to_delete.append(id)
            
    COLLECTION.delete(ids = ids_to_delete)
        
    
    print("\n===== DELETE FROM VECTORDB:")
    print("Number of deleted docs:", len(ids_to_delete))
