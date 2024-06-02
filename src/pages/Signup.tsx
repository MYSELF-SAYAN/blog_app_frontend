import React,{useState} from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignup = async() => {
    try{

      const res = await axios.post("http://localhost:8081/api/auth/signup",{
        username:username,
        email:email,
        password:password
      });
      navigate("/login")
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="flex items-center justify-center w-full h-screen flex-col ">
    <div className="flex backdrop-blur-md bg-opacity-20 bg-white/10 rounded-lg p-3 w-1/3 flex-col gap-y-5 items-center justify-center ">
      <h1 className="text-center text-2xl font-bold">Signup</h1>
      <div className="flex flex-col space-y-10 w-[80%] justify-center ">
        <input
          type="text"
          placeholder="Username"
          className="p-2 rounded-lg text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className="p-2 rounded-lg text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded-lg text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
        onClick={handleSignup}
        >
          SignUp
        </button>
      </div>
      <p className="text-xl font-bold ">
        Already have account ?
        <Link to="/login" className="text-red-500 ml-5 cursor-pointer">
        <span className="text-red-500 ml-5 cursor-pointer">Log in</span>
        </Link>
      </p>
    </div>
  </div>
  );
}

export default Signup;
