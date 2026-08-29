import React, { useState } from 'react'
import {
  FaChevronDown,
  FaEdit,
  FaHome,
  FaSignOutAlt,
  FaTrash,
  FaUserGraduate,
  FaUserTie
} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"
import axios from 'axios'
import { useEffect } from 'react'

const Home = () => {

  const cell = "border-b border-gray-200 px-4 py-4"
  const cellC = "px-4 py-4 text-left text-sm font-semibold text-white"
  const cellR = "border-b border-gray-200 px-4 py-4"

  const [arr, setArr] = useState(false)

  const navigate = useNavigate()

  // Delete Student
  const handleDelete = async (id) => {

    console.log("PP")

    try {

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/students/${id}`
      )

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      )

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to recover this student!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {

        if (result.isConfirmed) {

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Student Deleted Successfully",
          })

        }

      })

    } catch (err) {

      console.log(err)

    }

  }

  // Get data
  const [students, setStudents] = useState([])

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_API_URL}/api/students`)

      .then((res) => {

        setStudents(res.data)
        console.log(students)

      })

      .catch((err) => {

        console.log(err)

      })

  }, [])
  // logout
  const handleLogout=()=>{
    localStorage.removeItem("token")
    navigate("/")
  }

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white p-5 shadow-xl">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">

          <div className="bg-white/20 p-2 rounded-xl">
            <FaUserGraduate size={25} />
          </div>

          <div>
            <h1 className="font-bold text-lg">
              Student
            </h1>

            <p className="text-blue-200 text-sm">
              Management
            </p>
          </div>

        </div>

        <hr className="border-blue-400 mb-6" />

        {/* Home */}
        <button
          onClick={() => navigate("/Home")}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition mb-3"
        >
          <FaHome size={19} />
          <span>Home</span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/20 transition"
        >
          <FaSignOutAlt size={19} />
          <span>Logout</span>
        </button>

      </div>


      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">

        {/* Top Bar */}
        <div className="flex justify-end items-center mb-6">

          <div className="relative">

            <button
              onClick={() => setArr(!arr)}
              className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition"
            >

              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <FaUserTie size={18} />
              </div>

              <span className="font-semibold text-gray-700">
                Faculty
              </span>

              <FaChevronDown
                className={`text-gray-500 transition ${
                  arr ? "rotate-180" : ""
                }`}
              />

            </button>


            {/* Faculty Menu */}
            {arr && (

              <div className="absolute right-0 top-14 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">

                <button
                  onClick={() => navigate("/Myprofile")}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  My Profile
                </button>

                <button
                  onClick={() => navigate("/ChangePW")}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Change Password
                </button>

              </div>

            )}

          </div>

        </div>


        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <p className="text-sm text-blue-600 font-semibold mb-1">
                DASHBOARD
              </p>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Welcome, Faculty 👋
              </h1>

              <p className="text-gray-500 mt-2">
                Manage your students easily from one place.
              </p>

            </div>

            <button
              onClick={() => navigate("/Addstudent")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-blue-200 transition"
            >
              + Add Student
            </button>

          </div>

        </div>


        {/* Student Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Table Header */}
          <div className="p-6 border-b border-gray-100">

            <h2 className="text-xl font-bold text-gray-800">
              Student List
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              View and manage registered students
            </p>

          </div>


          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-blue-600">

                  <th className={cellC}>
                    #
                  </th>

                  <th className={cellC}>
                    Name
                  </th>

                  <th className={cellC}>
                    Register No
                  </th>

                  <th className={cellC}>
                    Department
                  </th>

                  <th className={cellC}>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {students.map((student, index) => (

                  <tr
                    key={student.id}
                    className="hover:bg-blue-50/50 transition"
                  >

                    <td className={`${cellR} text-gray-500 font-medium`}>
                      {index + 1}
                    </td>

                    <td className={`${cellR} font-semibold text-gray-800`}>
                      {student.name}
                    </td>

                    <td className={`${cellR} text-gray-600`}>
                      {student.register_no}
                    </td>

                    <td className={cellR}>

                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {student.department}
                      </span>

                    </td>


                    <td className={cellR}>

                      <div className="flex gap-2">

                        {/* Edit */}
                        <button
                          onClick={() =>
                            navigate(`/Edite/${student.id}`)
                          }
                          className="p-2.5 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200 transition"
                          title="Edit Student"
                        >
                          <FaEdit size={18} />
                        </button>


                        {/* Delete */}
                        <button
                          onClick={() =>
                            handleDelete(student.id)
                          }
                          className="p-2.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                          title="Delete Student"
                        >
                          <FaTrash size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Home