import { useState } from "react";
import api from "../api/axios";

function CreatePost() {
  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/posts/",
        {
          title,
          content,
        }
      );

      alert("Post created");
    } catch {
      alert(
        "Failed to create post"
      );
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Post</h2>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Title"
        />

        <textarea
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          placeholder="Content"
        />

        <button type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
