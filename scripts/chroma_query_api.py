import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import chromadb
from chromadb.config import Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from .llama_index_query import get_router_query_engine
from fastapi.responses import FileResponse  # Add this import

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend's origin
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    print(request)
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
