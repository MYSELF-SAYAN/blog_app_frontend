import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
interface Props {
  postsPerPage: number;
  posts: [
    {
      id: number;
      title: string;
      image: string;
    }
  ];
}
const Pagination: React.FC<Props> = ({ Props }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [totalPosts, setTotalPosts] = useState(20);
  const totalLength = Math.ceil(totalPosts / postsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalLength; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-between items-center w-1/2">
      <span>
        <FaChevronLeft />
      </span>
      <div>
        {pageNumbers.map((number) => (
          <span key={number} className="mx-2">
            {number}
          </span>
        ))}
      </div>
      <span>
        <FaChevronRight />
      </span>
    </div>
  );
};

export default Pagination;
