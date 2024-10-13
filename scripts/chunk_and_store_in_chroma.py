from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
import chromadb
import os

def chunk_data(data_path = './data/us/', collection_nam = 'document_chunks'):
    documents = SimpleDirectoryReader(data_path).load_data()

    # initialize chroma client, setting path to save data
    chroma_db_path = os.path.join(os.getcwd(), 'db/chroma_db')
    db = chromadb.PersistentClient(path=chroma_db_path)

    # create collection
    chroma_collection = db.get_or_create_collection(collection_nam)

    # assign chroma as the vector_store to the context
    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)

    # Embedding Model
    embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-base-en-v1.5")

    # create your index
    index = VectorStoreIndex.from_documents(
            documents,
            storage_context=storage_context,
            show_progress=True,
            #transformations=[node_parser],
            embed_model=embed_model,
    )

    # Here we save the index to the path we want
    index.storage_context.persist(chroma_db_path)

if __name__ == '__main__':
    # chunk_data(data_path='./data/china', collection_nam='document_chunks_china')
    chunk_data()