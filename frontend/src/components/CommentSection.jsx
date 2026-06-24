import { useEffect } from "react";
import { useState } from "react";

import api from "../api/axios";

function CommentSection({ postId }) {
  const [comments, setComments] =
    useState([]);

  const [content, setContent] =
    useState("");

  const [editingCommentId,
    setEditingCommentId] =
    useState(null);

  const [editContent,
    setEditContent] =
    useState("");

  const currentUserId =
    Number(
      localStorage.getItem(
        "user_id"
      )
    );

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const response =
        await api.get(
          `/comments/posts/${postId}`
        );

      setComments(
        response.data
      );

    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        `/comments/posts/${postId}`,
        {
          content
        }
      );

      setContent("");

      loadComments();

    } catch (error) {

      console.log(error);

      console.log(
        error.response
      );

      alert(
        JSON.stringify(
          error.response?.data
        )
      );
    }
  };

  const deleteComment =
    async (commentId) => {

      try {

        await api.delete(
          `/comments/${commentId}`
        );

        loadComments();

      } catch (error) {

        console.log(error);

        console.log(
          error.response?.data
        );

        alert(
          JSON.stringify(
            error.response?.data
          )
        );
      }
    };

  const startEdit =
    (comment) => {

      setEditingCommentId(
        comment.id
      );

      setEditContent(
        comment.content
      );
    };

  const saveEdit =
    async () => {

      try {

        await api.put(
          `/comments/${editingCommentId}`,
          {
            content:
              editContent
          }
        );

        setEditingCommentId(
          null
        );

        setEditContent("");

        loadComments();

      } catch (error) {

        console.log(error);

        console.log(
          error.response?.data
        );

        alert(
          JSON.stringify(
            error.response?.data
          )
        );
      }
    };

  return (
    <div className="comments">

      <h2>
        Comments
      </h2>

      {comments.map(
        (comment) => (

          <div
            key={comment.id}
            className="comment"
          >

            <strong>
              {
                comment.author_username
              }
            </strong>

            <p>
              {new Date(
                comment.created_at
              ).toLocaleString()}
            </p>

            {
              editingCommentId ===
              comment.id ? (

                <textarea
                  value={
                    editContent
                  }
                  onChange={(e) =>
                    setEditContent(
                      e.target.value
                    )
                  }
                />

              ) : (

                <p>
                  {
                    comment.content
                  }
                </p>

              )
            }

            {
              comment.author_id ===
              currentUserId && (

                <div
                  className="owner-actions"
                >

                  {
                    editingCommentId ===
                    comment.id ? (

                      <button
                        onClick={
                          saveEdit
                        }
                      >
                        Save
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          startEdit(
                            comment
                          )
                        }
                      >
                        Edit
                      </button>

                    )
                  }

                  <button
                    onClick={() =>
                      deleteComment(
                        comment.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              )
            }

          </div>
        )
      )}

      <form
        onSubmit={
          createComment
        }
      >

        <textarea
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          placeholder="Write a comment..."
        />

        <button
          type="submit"
        >
          Add Comment
        </button>

      </form>

    </div>
  );
}

export default CommentSection;
