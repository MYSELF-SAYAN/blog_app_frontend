import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import timeAgo from "../components/TimeAgo";
const Blog = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState<Date>();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/posts/user/${id}`
        );
        setPost(res.data);
        setTime(new Date(res.data.createdAt));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, []);
  return (
    <div className=" container max-w-6xl space-y-10">
      <Navbar />
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="backdrop-blur-md bg-opacity-20 bg-white/10 rounded-lg p-5 space-y-5">
          <div className="h-[500px] max-h-[500px] ">
            <img
              src={post.imageUrl}
              alt=""
              className="max-h-[500px] h-[500px] w-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col space-y-5">
            <h1 className="text-5xl font-bold">
              {post.title}
            </h1>
            <div className="flex items-center justify-between text-red-500 text-2xl font-bold">
              <p>By: {post.authorName}</p>
              <p>{timeAgo(time)}</p>
            </div>
            <p className="text-lg font-bold text-gray-100">
              {post.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
