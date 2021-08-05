import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import "./PostList.css";

export default function PostList({ posts, user }) {
  return (
    <div className="posts">
      {posts?.map((post) => (
        <Link
          to={{
            pathname: "/posts",
            search: `/${post.id}`,
          }}
        >
          <div className="postCard">
            <PostCard post={post} user={user} />
          </div>
        </Link>
      ))}
    </div>
  );
}
