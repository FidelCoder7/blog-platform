from pydantic import BaseModel
from datetime import datetime
from pydantic import ConfigDict

model_config = ConfigDict(
    from_attributes=True
)


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
    author_username: str

