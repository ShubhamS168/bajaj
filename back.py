from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI()

class RequestModel(BaseModel):
    data: List[str]

@app.post("/bfhl")
async def process_data(request: RequestModel):
    numbers = [item for item in request.data if item.isdigit()]
    alphabets = [item for item in request.data if item.isalpha()]
    highest_alphabet = [max(alphabets, key=str.lower)] if alphabets else []

    response = {
        "is_success": True,
        "user_id": "shubham_sourav_21042003",
        "email": "shubham@example.com",
        "roll_number": "CU12345",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highest_alphabet
    }
    return response

@app.get("/bfhl")
async def get_operation_code():
    return {"operation_code": 1}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
