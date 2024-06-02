import Navbar from "./components/Navbar"
import Blog from "./pages/Blog"
import Create from "./pages/Create"
import Home from "./pages/Home"
import Login from "./pages/Login"
import MyBlogs from "./pages/MyBlogs"
import Signup from "./pages/Signup"
import { Route, Routes, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function App() {
  const user = useSelector((state: any) => state.user)

  return (
    <div className='bg-[#0F172A] font-syne text-white items-center min-h-screen w-full p-5 flex flex-col'>
      <Routes>
        <Route path='/' element={user.isLogged ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={user.isLogged ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={user.isLogged ? <Navigate to="/" /> : <Signup />} />
        <Route path='/create' element={user.isLogged ?<Create />: <Navigate to="/login" />} />
        <Route path='/myblogs' element={user.isLogged ? <MyBlogs /> : <Navigate to="/login" />} />
        <Route path='/blog/:id' element={user.isLogged ? <Blog /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
