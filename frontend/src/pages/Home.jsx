import { useEffect } from "react";
import { useState } from "react";

import api from "../api/axios";

import PostCard
from "../components/PostCard";

function Home() {
  const [posts, setPosts] =
    useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const response =
      await api.get("/posts/");

    setPosts(response.data);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
      }}
    >
      <h1>Recent Posts</h1>

      <br />

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}

export default Home;