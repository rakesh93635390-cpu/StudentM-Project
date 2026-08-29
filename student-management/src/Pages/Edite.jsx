import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Edite = () => {

  const { id } = useParams();

  const [name, setName] = useState("");
  const [registerNo, setRegisterNo] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/students`)
      .then((res) => {

        const student = res.data.find(
          (student) => student.id === Number(id)
        );

        if (student) {
          setName(student.name);
          setRegisterNo(student.register_no);
          setDepartment(student.department);
        }

      })
      .catch((err) => {
        console.log(err);
      });

  }, [id]);


  const handleSave = async () => {

    if (name.trim() === "") {
      setError("Student Name is required");
      return;
    }

    if (registerNo.trim() === "") {
      setError("Register Number is required");
      return;
    }

    if (department === "") {
      setError("Please select a Department");
      return;
    }

    setError("");

    try {

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/students/${id}`,
        {
          name: name,
          register_no: registerNo,
          department: department
        }
      );

      setName("");
      setRegisterNo("");
      setDepartment("");

      Swal.fire({
        icon: "success",
        title: "update!",
        text: "Student Update Successfully",
        timer: 2000,
        showConfirmButton: false,
      });

    }
    catch (err) {
      console.log(err);
    }

  };


  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-5">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        <div className="bg-blue-500 text-white p-5">

          <h1 className="text-2xl font-bold">
            Update Student Information
          </h1>

          <p className="text-blue-100 mt-1">
            Edit the student details below
          </p>

        </div>


        {/* Form */}
        <div className="p-6 md:p-8">

          {/* Student Name */}
          <div className="mb-5">

            <label className="block font-semibold text-gray-700 mb-2">
              Student Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="text"
              name="StudentName"
              placeholder="Enter a Student Name"
            />

          </div>


          {/* Register Number */}
          <div className="mb-5">

            <label className="block font-semibold text-gray-700 mb-2">
              Student Register No
            </label>

            <input
              value={registerNo}
              onChange={(e) => setRegisterNo(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="text"
              name="StudentReg.No."
              placeholder="Enter a Register No"
            />

          </div>


          {/* Department */}
          <div className="mb-5">

            <label className="block font-semibold text-gray-700 mb-2">
              Select Department
            </label>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>BE.CSE</option>
              <option>B.Tech IT</option>
              <option>BE.EEE</option>
              <option>BE.ECE</option>
              <option>BE.MECHANICAL</option>
              <option>BE.CIVIL</option>
            </select>

          </div>


          {error && (
            <p className="text-red-500 bg-red-50 border border-red-200 rounded-xl p-3 mb-5">
              {error}
            </p>
          )}


          <div className="flex gap-3">

            <button
              onClick={handleSave}
              className="flex-1 p-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition"
            >
              Update
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

export default Edite;