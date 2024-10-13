from llama_index.core import SimpleDirectoryReader
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core import Settings
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core import SummaryIndex, VectorStoreIndex
from llama_index.core.tools import QueryEngineTool, ToolMetadata
from llama_index.core.query_engine.router_query_engine import RouterQueryEngine
from llama_index.core.query_engine import SubQuestionQueryEngine
from llama_index.core.selectors import LLMSingleSelector
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext
from llama_index.agent.openai import OpenAIAgent

import chromadb
from chromadb.config import DEFAULT_TENANT, DEFAULT_DATABASE, Settings
import os
#import nest_asyncio

#nest_asyncio.apply()
#os.environ['OPENAI_API_KEY'] ="sk-XXXX" # fill out own API



def get_router_query_engine(chat_agent = True, llm = None, embed_model = None, db_path = os.path.join(os.getcwd(), 'db/chroma_db'), collection_name = 'document_chunks'):
    """Load Chroma vector db"""
    client = chromadb.PersistentClient(
        path=db_path,
        settings=Settings(),
        tenant=DEFAULT_TENANT,
        database=DEFAULT_DATABASE,
    )
    chroma_collection = client.get_or_create_collection(collection_name)
    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)

    """Get router query engine."""
    llm = llm or OpenAI(model="gpt-3.5-turbo")
    embed_model = embed_model or OpenAIEmbedding(model="text-embedding-ada-002")

    # from vector db
    index = VectorStoreIndex.from_vector_store(
        vector_store,
        embed_model=embed_model,
    )
    query_engine = index.as_query_engine()

    if not chat_agent:
        return query_engine
    
    # load chat
    query_engine_tool = QueryEngineTool(
        query_engine=query_engine,
        metadata=ToolMetadata(
            name="question_query_engine",
            description=(
                "useful for when you want to answer queries that require analyzing"
                "multiple document for business in US"
            ),
        ),
    )
    tools = [query_engine_tool]
    agent = OpenAIAgent.from_tools(tools, verbose=True)
    return agent

if __name__ == '__main__':
    pass