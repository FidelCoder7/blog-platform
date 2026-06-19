from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_db,
    get_current_user
)

from app.models.user import User

from app.schemas.post import (
    PostCreate,
    PostUpdate,
    PostResponse
)

from app.services.post_service import (
    create_post,
    get_posts,
    get_post,
    update_post,
    delete_post
)

router = APIRouter(
    prefix="/posts",
    tags=["Posts"]
)


@router.post(
    "/",
    response_model=PostResponse
)
def create_new_post(
    post_data: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    return create_post(
        db,
        post_data.title,
        post_data.content,
        current_user.id
    )


@router.get(
    "/",
    response_model=list[PostResponse]
)
def get_all_posts(
    db: Session = Depends(get_db)
):
    return get_posts(db)



@router.get(
    "/{post_id}",
    response_model=PostResponse
)
def get_single_post(
    post_id: int,
    db: Session = Depends(get_db)
):
    post = get_post(
        db,
        post_id
    )

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    return post



@router.put(
    "/{post_id}",
    response_model=PostResponse
)
def update_existing_post(
    post_id: int,
    post_data: PostUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    post = get_post(
        db,
        post_id
    )

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    if post.author_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    return update_post(
        db,
        post,
        post_data.title,
        post_data.content
    )



@router.delete("/{post_id}")
def delete_existing_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    post = get_post(
        db,
        post_id
    )

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    if post.author_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    delete_post(
        db,
        post
    )

    return {
        "message": "Post deleted successfully"
    }