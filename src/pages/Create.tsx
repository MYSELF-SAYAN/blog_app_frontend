import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Create: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<any>(null);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      //console.log(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const imageName = Date.now();
      formData.append("image", image, imageName.toString());
      const imageRes = await axios.post(
        "http://localhost:8081/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newPost = {
        title: title,
        authorName: user.username,
        content: content,
        imageUrl: imageRes.data.secure_url,
        authorId: user.id,
      };
      const res = await axios.post(
        `http://localhost:8081/api/posts/${user.id}`,
        newPost
      );
      console.log(res);
      if (!res) {
        return (
          <div className="w-full min-h-screen">
            <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
          </div>
        );
      }
      else{
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex max-w-6xl flex-col backdrop-blur-md bg-opacity-20 bg-white/10 rounded-lg  gap-y-5 w-full  mx-auto p-5 bg-white shadow-lg text-white">
      <Navbar />
      <h1 className="text-3xl font-bold  mb-2">Create Post</h1>
      <div>
        {image === null ? (
          <div className="h-[500px] max-h-[500px] my-10 text-white flex justify-center items-center border border-white rounded-lg">
            <p className="text-5xl font-bold">Upload image</p>
          </div>
        ) : (
          <div className="h-[500px] max-h-[500px] my-10">
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="w-full rounded-lg object-cover h-[500px] max-h-[500px]"
            />
          </div>
        )}
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div className="flex flex-col gap-y-5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full  backdrop-blur-md bg-opacity-20 bg-white/10 rounded-lg p-3 focus:outline-none "
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40  backdrop-blur-md bg-opacity-20 bg-white/10 resize-none overflow-auto   rounded-lg p-3 focus:outline-none "
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-[200px]"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Create;
