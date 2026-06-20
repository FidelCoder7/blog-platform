from fastapi import APIRouter
from fastapi import Depends

from app.core.dependencies import get_current_user

from app.models.user import User

from app.schemas.user import UserResponse


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get(
    "/me",
    response_model=UserResponse
)
def get_me(
    current_user: User = Depends(
        get_current_user
    )
):
    return current_user


@router.get("/protected")
def protected_route(
    current_user: User = Depends(
        get_current_user
    )
):
    return {
        "message": "Access granted",
        "user": current_user.username
    }