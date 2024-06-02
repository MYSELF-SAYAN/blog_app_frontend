import { postProps } from "../Types";
import timeAgo from "./TimeAgo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
interface MyBlogCardProps extends postProps {
  triggerReload: () => void;
}
const MyBlogCard: React.FC<MyBlogCardProps> = ({ post, triggerReload }) => {
  const date = new Date(post.createdAt);
  const navigate = useNavigate();
  const deletePost = async () => {
    try {
      await axios.delete(
        `http://localhost:8081/api/posts/${post.id}/${post.authorId}`
      );
      triggerReload()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex backdrop-blur-md bg-opacity-20 bg-white/10 rounded-lg p-3 my-8 min-h-[280px] max-h-[280px]">
      <div className="w-[40%] max-h-[300px] h-full flex items-center justify-center ">
        <img
          className="rounded-2xl cursor-pointer object-contain w-full max-h-[280px]"
          src={post.imageUrl}
          alt=""
        />
      </div>
      <div className="flex flex-col   space-y-6 w-[60%] p-5">
        <h1 className="text-2xl font-bold">A better way to fly</h1>
        <div className="flex items-center justify-between text-red-500 font-bold">
          <p>By: {post.authorName}</p>
          <p>{timeAgo(date)}</p>
        </div>
        <p>
          {post.content.length > 150
            ? post.content.substring(0, 150) + "..."
            : post.content}{" "}
        </p>
        <div className="flex gap-x-5">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => {
              navigate(`/blog/${post.id}`);
            }}
          >
            Read more
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => {
              deletePost();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBlogCard;
