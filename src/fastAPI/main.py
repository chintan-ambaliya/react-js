import requests
from typing import Annotated
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import date

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

XANO_API_BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:t_-9ui02"


class NewItem(BaseModel):
    id: Optional[int] = None
    quotation: str
    client: Optional[str] = None
    email: str
    start_date: date
    end_date: date
    status: str
    amount: float


@app.post("/auth/get_token")
def get_token(email: str, password: str):
    params = {"email": email, "password": password}
    response = requests.post(f"{XANO_API_BASE_URL}/auth/login", params=params)
    data = response.json()
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return data


@app.get("/invoices")
def get_invoices(token: Annotated[str | None, Header()] = None):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{XANO_API_BASE_URL}/invoice", headers=headers)
    data = response.json()
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    data = response.json()
    return data


@app.get("/invoice/{item_id}")
def get_invoice(item_id: int, token: Annotated[str | None, Header()] = None):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{XANO_API_BASE_URL}/invoice/{item_id}", headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return response.json()


@app.post("/create_invoice")
def create_invoice(item: NewItem, token: Annotated[str | None, Header()] = None):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(f"{XANO_API_BASE_URL}/invoice", headers=headers, params=item)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return response.json()


@app.delete("/delete_invoice/{item_id}")
def delete_invoice(item_id: int, token: Annotated[str | None, Header()] = None):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.delete(f"{XANO_API_BASE_URL}/invoice/{item_id}", headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return response.json()


@app.patch("/update_invoice/{item_id}")
def update_invoice(item: NewItem, token: Annotated[str | None, Header()] = None):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.patch(f"{XANO_API_BASE_URL}/invoice/{item.id}", headers=headers, params=item)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return response.json()
