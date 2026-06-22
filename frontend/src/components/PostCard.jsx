import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <Link
      to={`/posts/${post.id}`}
    >
      <div className="post-card">

        <h3>
          {post.title}
        </h3>

        <p>
          {post.content.slice(
            0,
            150
          )}
          ...
        </p>

        

      </div>
    </Link>
  );
}

export default PostCard;
