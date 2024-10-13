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
from .chunk_and_store_in_chroma import chunk_data
from fastapi.responses import FileResponse  # Add this import
from llama_index.core.llms import ChatMessage, MessageRole
from llama_index.core import ChatPromptTemplate

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
        file_path = os.path.join('data/us', file.filename)

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        chunk_data('data/us', 'document_chunks')

        return {"message": f"File '{file.filename}' successfully uploaded and saved.", "file_path": file_path}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while saving the file: {str(e)}")

# Initialize the query engine (if needed)
@app.post("/api/chat")
async def query_router(request: QueryRequest):
    print(request)
    try:
        # Run the query using the engine
        result = ''
        if 'Client Directory' in request.message:
            prompt =  (
                'Summarize and give me 3-5 potential client companies related to my company',
                'Give response as a JSON object in the format:',
                'For example:',
                """
                {
                clients:[
                { 'client_name': clientA_name, 'client_location': clientA_location, 'client_contact': clientA_phone, 'client_description': clientB_description},
                ...
                ]
                }
                """
            )
            prompt = '\n'.join(prompt)
            result = agent.chat(prompt)
        elif 'Location Description' in request.message:
            prompt = (
                'Give me 3-5 locations suitable for expansion of my company',
                'Give response as a JSON object in the format:',
                'For example:',
                """
                {
                locations:[
                { 'location': "New York City", description: "The most populous city in the United States, known for its iconic skyline and diverse culture." },
                ...
                ]
                """
            )
            prompt = '\n'.join(prompt)
            result = agent.chat(prompt)
        elif 'Summary' in request.message:
            prompt = "My Company is Jullycat, Summarize the advantages of my company and how to expand my market in US"
            result = agent.chat(prompt)
        else:
            result = agent.chat(request.message)
        return {"message": str(result)}

    except Exception as e:
        print('Error')
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
