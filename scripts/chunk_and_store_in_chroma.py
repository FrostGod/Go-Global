from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
import chromadb
import os

# node transformation
#node_parser = SentenceSplitter(chunk_size=1024, chunk_overlap=20)
#documents = process_documents(df)
documents = SimpleDirectoryReader("./data/us/").load_data()

# initialize chroma client, setting path to save data
chroma_db_path = os.path.join(os.getcwd(), 'db/chroma_db')
db = chromadb.PersistentClient(path=chroma_db_path)

# create collection
chroma_collection = db.get_or_create_collection('document_chunks')

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
