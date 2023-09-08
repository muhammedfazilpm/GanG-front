import React, { useState } from "react";
import Navbaradmin from "./Navbaradmin";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { hideloading, showloading } from "../../redux/alertSlice";
import Adminfooter from "./Adminfooter";

export default function Addlocation() {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(showloading())
      const response = await axios.post("https://globalone.shop/api/admin/addlocation", {
        state,
        district,
      });
      dispatch(hideloading())
      console.log(response.data.success);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/location");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("some thing went wrong");
      console.error(error);
    }
  };

  return (
    <div className="h-full p-0">
      <Navbaradmin />
      <p className="text-center mt-4">Addlocation</p>

      <form
        onSubmit={handleSubmit}
        className="max-w-md h-full mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-gray-800"
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter the state
          </label>
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            type="text"
            id="email"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="district"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter the district
          </label>
          <input
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            type="text"
            id="district"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          style={{ backgroundColor: "red", width: "25%" }}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      </div>  );
}
