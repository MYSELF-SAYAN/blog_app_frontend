import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MyBlogCard from "../components/MyBlogCard";
import Navbar from "../components/Navbar";
import { blogProps } from "../Types";
const MyBlogs = () => {
  const user = useSelector((state: any) => state.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [triggerReload, setTriggerReload] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/posts/${user.id}`
        );
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    if (triggerReload) {
      const fetchPosts = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8081/api/posts/${user.id}`
          );
          setPosts(res.data);
          setLoading(false);
          setTriggerReload(false);
        } catch (err) {
          console.log(err);
        }
      };
      fetchPosts();
    }
  }, [triggerReload]);
  return (
    <div className="container max-w-6xl space-y-5">
      <Navbar />
      <div>
        <h1 className="text-5xl font-bold underline text-center">My Blogs</h1>
        {loading ? (
          <div>loading...</div>
        ) : (
          <div>
            {posts.map((post: blogProps) => (
              <MyBlogCard
                key={post.id}
                post={post}
                triggerReload={() => setTriggerReload(true)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
