import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const ChangePW = () => {

  const [currentP, setCurrentP] = useState("");
  const [newP, setNewP] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSave = async () => {

    // Current password validation
    if (currentP.trim() === "") {
      setError("Current Password is required");
      return;
    }

    // New password validation
    if (newP.trim() === "") {
      setError("New Password is required");
      return;
    }

    // Minimum password length
    if (newP.length < 6) {
      setError("New Password must be at least 6 characters");
      return;
    }

    setError("");

    try {

      // Get login token
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again");
        return;
      }

      // Send request to backend
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}api/faculty/change-password`,
        {
          currentPassword: currentP,
          newPassword: newP
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Success message
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: res.data.message,
        timer: 2000,
        showConfirmButton: false,
      });

      // Clear inputs
      setCurrentP("");
      setNewP("");

    } catch (err) {

      console.log(err);

      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Server Error");
      }
    }
  };

  return (

    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-5">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-blue-500 text-white p-5 text-center">

          <h1 className="text-2xl font-bold">
            Change Your Password
          </h1>

          <p className="text-blue-100 mt-1">
            Update your account password
          </p>

        </div>

        {/* Form */}
        <div className="p-6 md:p-8">

          {/* Current Password */}
          <div className="mb-5">

            <label className="block font-semibold text-gray-700 mb-2">
              Current Password
            </label>

            <input
              value={currentP}
              onChange={(e) => {
                setCurrentP(e.target.value);
                setError("");
              }}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="password"
              placeholder="Enter your current password"
            />

          </div>

          {/* New Password */}
          <div className="mb-5">

            <label className="block font-semibold text-gray-700 mb-2">
              New Password
            </label>

            <input
              value={newP}
              onChange={(e) => {
                setNewP(e.target.value);
                setError("");
              }}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="password"
              placeholder="Enter your new password"
            />

          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 bg-red-50 border border-red-200 rounded-xl p-3 mb-5">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3">

            <button
              onClick={handleSave}
              className="flex-1 p-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition"
            >
              Save
            </button>

            <button
              onClick={() => navigate("/Home")}
              className="flex-1 p-3 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-xl transition"
            >
              Cancel
            </button>

          </div>

        </div>
      </div>
    </div>

  );
};

export default ChangePW;