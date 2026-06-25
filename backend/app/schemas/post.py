from pydantic import BaseModel
from datetime import datetime
from pydantic import ConfigDict

model_config = ConfigDict(
    from_attributes=True
)


class PostCreate(BaseModel):
    title: str
    content: str


class PostUpdate(BaseModel):
    title: str
    content: str


class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    author_username: str
    created_at: datetime

