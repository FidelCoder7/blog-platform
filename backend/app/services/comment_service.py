from sqlalchemy.orm import Session

from app.models.comment import Comment


def create_comment(
    db: Session,
    content: str,
    author_id: int,
    post_id: int
):
    comment = Comment(
        content=content,
        author_id=author_id,
        post_id=post_id
    )

    db.add(comment)
    db.commit()
    db.refresh(comment)

    return comment


def get_comments_by_post(
    db: Session,
    post_id: int
):
    return (
        db.query(Comment)
        .filter(Comment.post_id == post_id)
        .all()
    )


def get_comment(
    db: Session,
    comment_id: int
):
    return (
        db.query(Comment)
        .filter(Comment.id == comment_id)
        .first()
    )


def update_comment(
    db: Session,
    comment: Comment,
    content: str
):
    comment.content = content

    db.commit()
    db.refresh(comment)

    return comment


def delete_comment(
    db: Session,
    comment: Comment
):
    db.delete(comment)
    db.commit()