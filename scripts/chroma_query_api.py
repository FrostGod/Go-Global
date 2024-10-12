import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import chromadb
from chromadb.config import Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from .llama_index_query import get_router_query_engine

app = FastAPI()
embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-base-en-v1.5")
agent = get_router_query_engine(chat_agent=True, embed_model=embed_model)

# Define a request model
class QueryRequest(BaseModel):
    query: str

# Initialize the query engine (if needed)
@app.post("/query")
async def query_router(request: QueryRequest):
    try:
        # Run the query using the engine
        result = agent.chat(request.query)
        return {"answer": str(result)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)