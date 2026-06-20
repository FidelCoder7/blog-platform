from pydantic import BaseModel
from datetime import datetime


class CommentCreate(BaseModel):
    content: str


class CommentUpdate(BaseModel):
    content: str


class CommentResponse(BaseModel):
    id: int
    content: str
    author_id: int
    post_id: int
    created_at: datetime

    class Config:
        from_attributes = True