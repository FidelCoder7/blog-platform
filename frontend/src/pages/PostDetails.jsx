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

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    const response = await api.get(
      `/posts/${id}`
    );

    setPost(response.data);
  };

  if (!post) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="post-details">

      <h1>{post.title}</h1>

      <p>{post.content}</p>

      <CommentSection
        postId={id}
      />

      <h1>{post.title}</h1>

        <p>
          By {post.author_username}
        </p>

        <p>
          {new Date(
            post.created_at
          ).toLocaleString()}
        </p>

        {
          post.author_id === currentUserId && (
            <button
              onClick={deletePost}
            >
              Delete Post
            </button>
          )
        }

    </div>
  );
}

export default PostDetails;
