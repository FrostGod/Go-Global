import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import chromadb
from chromadb.config import Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from .llama_index_query import get_router_query_engine

app = FastAPI()
app.mount("/static", StaticFiles(directory="my-app/build/static"), name="static")

embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-base-en-v1.5")
agent = get_router_query_engine(chat_agent=True, embed_model=embed_model)

# Define a request model
class QueryRequest(BaseModel):
    query: str

@app.get("/")
async def serve_react_app():
    index_path = os.path.join("my-app", "build", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    raise HTTPException(status_code=404, detail="React frontend not found")

# Initialize the query engine (if needed)
@app.post("/api/chat")
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