import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignIn = () => {
  const navigate = useNavigate(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");


  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [departmentError, setDepartmentError] = useState("");


  const handleSignIn = async (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setDepartmentError("")

    if (!name) {
      setNameError("Name is required");
      return;
    }

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

     if (!department) {
      setPasswordError("Department is required");
      return;
    }

    try {
      const res = await axios.post(
         `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
          department
        }
      );

      console.log(res.data);

        if (res.data.message === "User Registered Successfully") {

  Swal.fire({
    icon: "success",
    title: "Success!",
    text: "Sign In Successfully",
    timer: 2000,
    showConfirmButton: false,
  });

  setName("");
  setEmail("");
  setPassword("");
  setDepartment("")

  setTimeout(() => {
    navigate("/Home");
  }, 2000);
}
if(res.data.message === "Email Already Exists"){
 Swal.fire({
    icon: "error",
    title: "Email Already Exists",
    text: "Please enter a valid email",
    timer: 2000,
    showConfirmButton: false,
  });
}
    } 
    catch (err) {
      console.log(err);
    }
    
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Student Sign In
          </h1>

          <p className="text-slate-500 mt-2">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              className={`w-full px-4 py-3 rounded-lg border outline-none ${
                nameError
                  ? "border-red-500"
                  : "border-slate-300 focus:border-blue-500"
              }`}
            />

            {nameError && (
              <p className="text-red-500 text-sm mt-1">
                {nameError}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className={`w-full px-4 py-3 rounded-lg border outline-none ${
                emailError
                  ? "border-red-500"
                  : "border-slate-300 focus:border-blue-500"
              }`}
            />

            {emailError && (
              <p className="text-red-500 text-sm mt-1">
                {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              className={`w-full px-4 py-3 rounded-lg border outline-none ${
                passwordError
                  ? "border-red-500"
                  : "border-slate-300 focus:border-blue-500"
              }`}
            />

            {passwordError && (
              <p className="text-red-500 text-sm mt-1">
                {passwordError}
              </p>
            )}
          </div>

            {/* Department */}

           <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Department
            </label>

            <input
              type="text"
              placeholder="Enter your Department"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDepartmentError("");
              }}
              className={`w-full px-4 py-3 rounded-lg border outline-none ${
                departmentError
                  ? "border-red-500"
                  : "border-slate-300 focus:border-blue-500"
              }`}
            />

            {departmentError && (
              <p className="text-red-500 text-sm mt-1">
                {departmentError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Sign In
          </button>

        </form>

      </div>
    </div>
  );
};

export default SignIn;