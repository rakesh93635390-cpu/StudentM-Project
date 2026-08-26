import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Myprofile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/faculty/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(res.data);

      setProfile(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  getProfile();
}, []);

  return (

    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-5">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-blue-500 text-white p-5 text-center">

          <h1 className="text-2xl font-bold">
            My Profile
          </h1>

          <p className="text-blue-100 mt-1">
            Faculty Information
          </p>

        </div>


        {/* Profile Details */}
        <div className="p-6 md:p-8">

          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-500">
              Name
            </p>

            <p className="font-semibold text-blue-500 text-lg">
            {profile?.name}
            </p>
          </div>


          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-semibold text-blue-500 text-lg">
               {profile?.email}
            </p>
          </div>


          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500">
              Department
            </p>

            <p className="font-semibold text-blue-500 text-lg">
                {profile?.department}
            </p>
          </div>


          {/* Close Button */}
          <button
            onClick={() => navigate("/Home")}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold p-3 rounded-xl shadow-lg transition"
          >
            Close
          </button>

        </div>

      </div>

    </div>

  );
};

export default Myprofile;