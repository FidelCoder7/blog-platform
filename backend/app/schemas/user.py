from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import ConfigDict

model_config = ConfigDict(
    from_attributes=True
)


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr


