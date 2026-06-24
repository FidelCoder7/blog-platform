import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";
import CommentSection from "../components/CommentSection";

function PostDetails() {
  const { id } = useParams();

  const currentUserId =
  Number(
    localStorage.getItem(
      "user_id"
    )
  );

  const deletePost =
  async () => {

  try {

    await api.delete(
      `/posts/${id}`
    );

    alert(
      "Post deleted"
    );

    window.location.href = "/";

  } catch (error) {

    console.log(error);

    alert(
      "Failed to delete post"
    );
  }
};

  const [post, setPost] = useState(null);
  const [editing,
  setEditing] =
  useState(false);

  const [title,
    setTitle] =
    useState("");

  const [content,
    setContent] =
    useState("");

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    const response = await api.get(
      `/posts/${id}`
    );

    setPost(response.data);
    setTitle(
      response.data.title
    );

    setContent(
      response.data.content
    );
  };

  if (!post) {
    return <h2>Loading...</h2>;
  }
  
  const updatePost =
    async () => {

    try {

      await api.put(
        `/posts/${id}`,
        {
          title,
          content
        }
      );

      setEditing(false);

      loadPost();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to update post"
      );
    }
  };
  return (
    <div className="post-details">

      <h1>{
            editing ? (

              <input
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
              />

            ) : (

              <h1>
                {post.title}
              </h1>

            )
          }
        </h1>

      <p>
        By {post.author_username}
      </p>

      <p>
        {new Date(
          post.created_at
        ).toLocaleString()}
      </p>

      <p>
        {
          editing ? (

            <textarea
              value={content}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
            />

          ) : (

            <p>
              {post.content}
            </p>

          )
        }
      </p>

      {
        post.author_id ===
        currentUserId && (

          <div
            className="owner-actions"
          >

            {
              editing ? (

                <button
                  onClick={
                    updatePost
                  }
                >
                  Save
                </button>

              ) : (

                <button
                  onClick={() =>
                    setEditing(
                      true
                    )
                  }
                >
                  Edit
                </button>

              )
            }

            <button
              onClick={
                deletePost
              }
            >
              Delete
            </button>

          </div>

        )
      }
      <CommentSection
        postId={id}
      />

    </div>
  );
}

export default PostDetails;
