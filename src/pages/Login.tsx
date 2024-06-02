import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          username: username,
          password: password,
        }
      );
      dispatch(signIn(response.data));
      navigate("/");
      //console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  // useEffect(() => {
  //   console.log(username, password);
  // }, [username, password]);
  return (
    <div className="flex items-center justify-center w-full h-screen flex-col ">
      <div className="flex backdrop-blur-md bg-opacity-20 bg-white/10 rounded-lg p-3 w-1/3 flex-col gap-y-5 items-center justify-center ">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <div className="flex flex-col space-y-10 w-[80%] justify-center ">
          <input
            type="text"
            placeholder="Username"
            className="p-2 rounded-lg text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded-lg text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
            onClick={submitHandler}
          >
            Login
          </button>
        </div>
        <p className="text-xl font-bold">
          Dont have account ?
          <Link to="/signup" className="text-red-500 ml-5 cursor-pointer">
          <span className="text-red-500 ml-5 cursor-pointer">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
