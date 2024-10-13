import os
from fastapi import FastAPI, Request, HTTPException, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import chromadb
from chromadb.config import Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from .llama_index_query import get_router_query_engine
from fastapi.responses import FileResponse  # Add this import

app = FastAPI()
# app.mount("/static", StaticFiles(directory="my-app/build/static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-base-en-v1.5")
china_agent = get_router_query_engine(chat_agent=True, embed_model=embed_model, collection_name='document_chunks_china')
agent = get_router_query_engine(chat_agent=True, embed_model=embed_model)

# Define a request model
class QueryRequest(BaseModel):
    message: str

"""
@app.get("/")
async def serve_react_app():
    index_path = os.path.join("my-app", "build", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    raise HTTPException(status_code=404, detail="React frontend not found")
"""

# Upload file
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid document format. Only PDFs are supported.")

    try:
        file_path = os.path.join('data/user', file.filename)

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        return {"message": f"File '{file.filename}' successfully uploaded and saved.", "file_path": file_path}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while saving the file: {str(e)}")

# Initialize the query engine (if needed)
@app.post("/api/chat")
async def query_router(request: QueryRequest):
    print(request)
    try:
        # Run the query using the engine
        result = agent.chat(request.message)
        return {"message": str(result)}

    except Exception as e:
        print('Error')
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
