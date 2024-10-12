import os, sys
import chromadb
from chromadb.config import DEFAULT_TENANT, DEFAULT_DATABASE, Settings
from transformers import AutoTokenizer, AutoModel
import openai

db_path = os.path.join(os.getcwd(), 'db/chroma_db')
# Initialize Chroma client
#client = chromadb.Client(Settings(persist_directory=db_path))
client = chromadb.PersistentClient(
    path=db_path,
    settings=Settings(),
    tenant=DEFAULT_TENANT,
    database=DEFAULT_DATABASE,
)

# Create or connect to a Chroma collection
collection = client.create_collection("document_chunks")

# Choose a tokenizer and embedding model (using Hugging Face here as an example)
tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

def get_embeddings(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).detach().numpy()

# Function to chunk a document (this example uses paragraphs)
def chunk_document(text, chunk_size=100):
    sentences = text.split(". ")  # You can adjust the tokenizer
    chunks = []
    current_chunk = []
    current_length = 0
    
    for sentence in sentences:
        sentence_length = len(sentence.split())
        if current_length + sentence_length <= chunk_size:
            current_chunk.append(sentence)
            current_length += sentence_length
        else:
            chunks.append(" ".join(current_chunk))
            current_chunk = [sentence]
            current_length = sentence_length
    if current_chunk:
        chunks.append(" ".join(current_chunk))
    
    return chunks

# Example document (replace this with your actual document)
document = """
Artificial intelligence (AI) refers to the simulation of human intelligence in machines. These machines are designed to think and act like humans. The concept of AI has been around for many decades, but recent advances in technology have made it more prevalent in our everyday lives.
AI can be used in a variety of applications, such as voice assistants, image recognition, and autonomous vehicles. The possibilities for AI applications are virtually limitless, but there are also concerns about its impact on jobs and privacy.
"""

# Chunk the document
chunks = chunk_document(document, chunk_size=50)

# For each chunk, get embeddings and insert them into Chroma
for i, chunk in enumerate(chunks):
    embedding = get_embeddings(chunk)
    # Add to Chroma collection
    collection.add(
        documents=[chunk],
        embeddings=[embedding],
        ids=[f"chunk_{i}"]
    )

print(f"Added {len(chunks)} chunks to the Chroma collection!")