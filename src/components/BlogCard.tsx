import React from "react";
import timeAgo from "./TimeAgo";
import { useNavigate } from "react-router-dom";
interface blogProps {
  post: {
    title: string;
    content: string;
    authorId: string;
    id: string;
    authorName: string;
    createdAt: string;
    imageUrl: string;
  };
}
const BlogCard: React.FC<blogProps> = ({ post }) => {
  const date = new Date(post.createdAt);
  const navigate = useNavigate();
  return (
    <div className="flex backdrop-blur-md bg-opacity-20 bg-white/10 rounded-lg p-3 my-8 min-h-[200px] max-h-[200px]">
      <div className="flex flex-col   space-y-6 w-[60%] p-5">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="flex items-center justify-between">
          <p>{post.authorName}</p>
          <p>{timeAgo(date)}</p>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
          onClick={() => {
            navigate(`/blog/${post.id}`);
          }}
        >
          Read more
        </button>
      </div>
      <div className="w-[40%] h-full flex items-center justify-center ">
        <img
          className="rounded-2xl cursor-pointer  w-full min-h-[180px] max-h-[180px]"
          src={post.imageUrl}
          alt=""
        />
      </div>
    </div>
  );
};

export default BlogCard;
