from app.database.database import SessionLocal
from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from app.database.database import SessionLocal

from app.core.security import verify_access_token

from app.services.user_service import get_user_by_id


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    user_id = verify_access_token(token)

    if user_id is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = get_user_by_id(
        db,
        user_id
    )

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user