import { useEffect } from "react";
import { useState } from "react";

import api from "../api/axios";



function CommentSection({ postId }) {
  const [comments, setComments] =
    useState([]);

  const [content, setContent] =
    useState("");

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const response =
        await api.get(
          `/comments/posts/${postId}`,
          
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

      console.log(error.response);

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
                {comment.author_username}
              </strong>

               <p>
                  {new Date(
                    comment.created_at
                  ).toLocaleString()}
                </p>

              <p>
                {comment.content}
              </p>
            </div>     
          
        )
      )}

      <form
        onSubmit={createComment}
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
