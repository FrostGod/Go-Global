from llama_index.core import SimpleDirectoryReader
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core import Settings
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core import SummaryIndex, VectorStoreIndex
from llama_index.core.tools import QueryEngineTool
from llama_index.core.query_engine.router_query_engine import RouterQueryEngine
from llama_index.core.selectors import LLMSingleSelector
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext
import chromadb
from chromadb.config import DEFAULT_TENANT, DEFAULT_DATABASE, Settings
import os
#import nest_asyncio

#nest_asyncio.apply()
#os.environ['OPENAI_API_KEY'] ="sk-XXXX" # fill out own API



def get_router_query_engine(llm = None, embed_model = None, db_path = os.path.join(os.getcwd(), 'db/chroma_db')):
    """Load Chroma vector db"""
    client = chromadb.PersistentClient(
        path=db_path,
        settings=Settings(),
        tenant=DEFAULT_TENANT,
        database=DEFAULT_DATABASE,
    )
    chroma_collection = client.get_or_create_collection("document_chunks")
    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
    # storage_context = StorageContext.from_defaults(vector_store=vector_store)

    """Get router query engine."""
    llm = llm or OpenAI(model="gpt-3.5-turbo")
    embed_model = embed_model or OpenAIEmbedding(model="text-embedding-ada-002")

    # from vector db
    index = VectorStoreIndex.from_vector_store(
        vector_store,
        embed_model=embed_model,
    )
    query_engine = index.as_query_engine()
    return query_engine
    
    # load documents
    documents = SimpleDirectoryReader(input_files=[file_path]).load_data()
    
    splitter = SentenceSplitter(chunk_size=1024)
    nodes = splitter.get_nodes_from_documents(documents)
    
    summary_index = SummaryIndex(nodes)
    vector_index = VectorStoreIndex(nodes, embed_model=embed_model)

    summary_query_engine = summary_index.as_query_engine(
        response_mode="tree_summarize",
        use_async=True,
        llm=llm
    )
    summary_tool = QueryEngineTool.from_defaults(
        query_engine=summary_query_engine,
        description=(
            'Useful for summarization questions related to business in the specific area' #FIXME: hardcoded description
        ),
    )
    vector_query_engine = vector_index.as_query_engine(llm=llm)
    
    vector_tool = QueryEngineTool.from_defaults(
        query_engine=vector_query_engine,
        description=(
            'Useful for retrieving specific context from the business in the specific area' #FIXME: hardcoded description
        ),
    )
    
    query_engine = RouterQueryEngine(
        selector=LLMSingleSelector.from_defaults(),
        query_engine_tools=[
            summary_tool,
            vector_tool,
        ],
        verbose=True
    )
    return query_engine

if __name__ == '__main__':
    pass