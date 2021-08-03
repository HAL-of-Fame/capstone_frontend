import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
export default function PostList({ posts }) {
  return (
    <div className="posts">
      {posts?.map((post) => (
        <Link
          to={{
            pathname: "/posts",
            search: `/${post.id}`,
          }}
        >
            <div className='postCard'>
          <PostCard post={post} />
          </div>
        </Link>
      ))}
    </div>
  );
}
