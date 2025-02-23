from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

class Item(BaseModel):
    text: str
    is_done: bool = False

items = []

# GET Request
# curl -X 'GET' 'http://localhost:8000/items'
@app.get("/items")
def get_items():
    return items

# POST Request
# curl -X 'POST' 'http://localhost:8000/items' -H 'Content-Type: application/json' -d '{"text": "Sample task", "is_done": false}'
@app.post("/items")
def add_item(item: Item):
    items.append(item)
    return {"message": "Item added", "item": item}
