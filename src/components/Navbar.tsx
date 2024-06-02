import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/slices/userSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <nav className="flex backdrop-blur-md bg-opacity-20 font-syne bg-white/10 rounded-lg px-8 py-4 text-white items-center  justify-between">
      <h1 className="font-syne font-bold text-2xl cursor-pointer">BlogBuzz</h1>
      <div className="flex items-center justify-between w-[35%]">
        <ul className="flex space-x-8 items-center justify-center ">
          <Link to="/" className="hover:text-gray-300 cursor-pointer font-semibold">
           
          <li className="hover:text-gray-300 cursor-pointer font-semibold">
            Home
          </li>
          </Link>
          <Link to="/create" className="hover:text-gray-300 cursor-pointer font-semibold">
          <li className="hover:text-gray-300 cursor-pointer font-semibold">
            Create
          </li>
          </Link>
          <Link to="/myblogs" className="hover:text-gray-300 cursor-pointer font-semibold">
          <li className="hover:text-gray-300 cursor-pointer font-semibold">
           My Blogs
          </li>
          </Link>
        </ul>
       
          <button className="w-[80px] py-2 rounded-xl bg-red-500 hover:bg-red-600 "onClick={handleLogout}>Logout</button>
        
      </div>
    </nav>
  );
};

export default Navbar;
