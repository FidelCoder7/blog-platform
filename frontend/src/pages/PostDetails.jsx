import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";
import CommentSection from "../components/CommentSection";

function PostDetails() {
  const { id } = useParams();

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

    </div>
  );
}

export default PostDetails;
