from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_db,
    get_current_user
)

from app.models.user import User

from app.schemas.comment import (
    CommentCreate,
    CommentUpdate,
    CommentResponse
)

from app.services.comment_service import (
    create_comment,
    get_comments_by_post,
    get_comment,
    update_comment,
    delete_comment
)

from app.services.post_service import get_post

router = APIRouter(
    prefix="/comments",
    tags=["Comments"]
)


@router.post(
    "/posts/{post_id}",
    response_model=CommentResponse
)
def create_new_comment(
    post_id: int,
    comment_data: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    post = get_post(db, post_id)

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    return create_comment(
        db,
        comment_data.content,
        current_user.id,
        post_id
    )


@router.get(
    "/posts/{post_id}",
    response_model=list[CommentResponse]
)
def get_post_comments(
    post_id: int,
    db: Session = Depends(get_db)
):
    return get_comments_by_post(
        db,
        post_id
    )



@router.put(
    "/{comment_id}",
    response_model=CommentResponse
)
def update_existing_comment(
    comment_id: int,
    comment_data: CommentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    comment = get_comment(
        db,
        comment_id
    )

    if not comment:
        raise HTTPException(
            status_code=404,
            detail="Comment not found"
        )

    if comment.author_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    return update_comment(
        db,
        comment,
        comment_data.content
    )



@router.delete("/{comment_id}")
def delete_existing_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    comment = get_comment(
        db,
        comment_id
    )

    if not comment:
        raise HTTPException(
            status_code=404,
            detail="Comment not found"
        )

    if comment.author_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    delete_comment(
        db,
        comment
    )

    return {
        "message": "Comment deleted successfully"
    }