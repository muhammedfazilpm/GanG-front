import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbaradmin from "./Navbaradmin";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Editlocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const id = data._id;

  const [state, setState] = useState(data.state);
  const [districts, setDistricts] = useState(data.district);

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleDistrictChange = (e, index) => {
    const updatedDistricts = [...districts];
    updatedDistricts[index] = e.target.value;
    setDistricts(updatedDistricts);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/admin/editlocation", {
        id,
        state,
        districts,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/location");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrongg");
    }
  };

  return (
    <div>
      <Navbaradmin />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-gray-800"
      >
        <div className="mb-6">
          <label
            htmlFor="state"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter the state
          </label>
          <input
            value={state}
            onChange={handleStateChange}
            type="text"
            id="state"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          {districts.map((districtValue, index) => (
            <div key={index} className="mb-6">
              <label
                htmlFor={`district${index}`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter the district {index + 1}
              </label>
              <input
                value={districtValue}
                onChange={(e) => handleDistrictChange(e, index)}
                type="text"
                id={`district${index}`}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          ))}
        </div>
        <input type="hidden" value={data._id} />
        <button
          style={{ backgroundColor: "red", width: "25%" }}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
