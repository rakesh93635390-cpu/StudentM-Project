import React from 'react'
import { useNavigate } from 'react-router-dom'
import studentLogin from '../assets/student.png'
import { useState } from 'react'
import axios from "axios";

const Login = () => {
  
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [Eerr,setEerr]=useState("")
const [Perr,setPerr]=useState("")


const handleLogin = async () => {
  try {
    setEerr("")
    setPerr("")

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        email: email,
        password: password
      }
    );

    console.log(res.data);

    if(res.data.message === "Invalid Email"){
      setEerr("Invalid Email")
      return;
    }
    if(res.data.message === "Invalid Password"){
      setPerr("Invalid Password")
      return;
    }

  // Check Token
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      navigate("/Home");
    } else {
      alert(res.data.message);
    }

  } catch (err) {
    console.log(err);
    alert("Server Error");
  }
};

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Login Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-blue-600">
              Login
            </h1>

            <p className="text-gray-500 mt-2">
              Enter your account details
            </p>
          </div>

          <div className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
              {Eerr && (
  <p className="text-red-500 text-center mt-4 font-semibold">
    {Eerr}
  </p>
)}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                 onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
                          {Perr && (
  <p className="text-red-500 text-center mt-4 font-semibold">
    {Perr}
  </p>
)}
            </div>

          </div>


          <button
            onClick={handleLogin}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-200 transition duration-200"
          >
            Login
          </button>

          <p className="text-center text-gray-500 mt-6">
            Don't have an account?

            <span onClick={()=>navigate("/SignIn")} className="text-blue-600 font-semibold cursor-pointer hover:underline ml-1">
              SignUp
            </span>
          </p>

        </div>


        {/* Student Portal Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 p-8 md:p-10 flex flex-col items-center justify-center text-white">

          <div className="w-full max-w-sm">

            <img
              src={studentLogin}
              alt="student"
              className="w-full h-64 object-contain"
            />

            <div className="text-center mt-6">

              <h1 className="text-3xl font-bold">
                Welcome
              </h1>

              <h2 className="text-xl font-semibold mt-1">
                to Student Portal
              </h2>

              <p className="text-blue-100 mt-3">
                Login to access your account
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login