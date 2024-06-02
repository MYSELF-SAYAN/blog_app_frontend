import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import SliderCard from "../components/SliderCard";
import BlogCard from "../components/BlogCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { blogProps } from "../Types";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const maxPageNumbersToShow = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const user = useSelector((state: any) => state.user);
  const recentFivePosts = posts.slice(0, 5);
  const pages: number[] = [];
  
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pages.push(i);
  }

  const paginate = (pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  const paginateRight = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginateLeft = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/posts/");
      //console.log(res.data);
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const getPageNumbersToShow = () => {
    const totalPages = pages.length;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    const adjustedStartPage =
      endPage - startPage < maxPageNumbersToShow - 1
        ? Math.max(1, endPage - maxPageNumbersToShow + 1)
        : startPage;

    return pages.slice(adjustedStartPage - 1, endPage);
  };

  return (
    <div className="container w-full max-w-6xl flex flex-col justify-center ">
      <Navbar />
      <div className="w-full mx-auto px-4">
        <Splide
          className="w-full "
          options={{
            type: "loop",
            autoplay: "play",
            interval: 3000,
            pauseOnHover: false,
            arrows: true,
            pagination: false,
            perPage: 1,
          }}
        >
          {
            // @ts-ignore
            recentFivePosts.map((post: blogProps) => (
              <SplideSlide key={post.id}>
                <SliderCard post={post} />
              </SplideSlide>
            ))
          }
        </Splide>
      </div>
      <div className="w-full max-w-6xl mx-auto px-4">
        <h1 className="text-center my-5 text-5xl font-bold underline">Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            currentPosts.map((post: blogProps) => (
              <BlogCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
      <div className="flex w-full justify-between items-center my-5">
        <span
          onClick={paginateLeft}
          className="cursor-pointer  text-2xl font-bold"
        >
          <FaChevronLeft />
        </span>
        <div className="flex gap-x-5 mx-4">
          {getPageNumbersToShow().map((page) => (
            <span
              key={page}
              onClick={() => paginate(page)}
              className={`cursor-pointer text-xl backdrop-blur-md bg-opacity-20 bg-white/10 rounded-full flex items-center justify-center w-14 h-14 font-bold ${
                currentPage === page ? "text-blue-500" : ""
              }`}
            >
              {page}
            </span>
          ))}
        </div>
        <span
          onClick={paginateRight}
          className="cursor-pointer  text-2xl font-bold"
        >
          <FaChevronRight />
        </span>
      </div>
    </div>
  );
};

export default Home;
