import React from "react";
import { postProps } from "../Types";
import { useNavigate } from "react-router-dom";
const SliderCard: React.FC<postProps> = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div className="flex backdrop-blur-md bg-opacity-20 bg-white/10 rounded-lg p-12 my-8 max-h-[400px] min-h-[400px]">
      <div className="flex flex-col   space-y-6 w-1/2 p-5">
        <h1 className="text-5xl font-bold">{post.title}</h1>
        <p className="text-xl">
          {post.content.length > 150
            ? post.content.substring(0, 150) + "..."
            : post.content}
        </p>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-1/2"
          onClick={() => {
            navigate(`/blog/${post.id}`);
          }}
        >
          Read more
        </button>
      </div>
      <div className="w-1/2 p-2 flex items-center justify-center">
        <img
          className="rounded-2xl cursor-pointer object-fill max-h-[300px] min-h-[300px]"
          src={post.imageUrl}
          alt=""
        />
      </div>
    </div>
  );
};

export default SliderCard;
