import React from "react";
import Navbaradmin from "./Navbaradmin";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "flowbite";
import toast from "react-hot-toast";

export default function Viewadminguide() {
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  const guide = useLocation();
  const guides = guide.state;
  const id = guides._id;
  const getdetails = async () => {
    try {
      const response = await axios.post("/api/admin/getdetails", { id: id });
      setDetails(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changestatus = async () => {
    try {
      const response = await axios.post("/api/admin/verifyguide", {
        id: details.guidid,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/guide");
        window.location.reload()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    getdetails();
  }, []);

  useEffect(() => {
    console.log("GUIDE", details);
  }, [details]);

  return (
    <div>
      <Navbaradmin />

      <div style={{ display: "flex", marginTop: "3%" }}>
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {details ? "" : <p style={{ color: "red" }}>No details added</p>}
          <a href="#">
            <img class="rounded-t-lg" src={details?.idimage} alt="image" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {details?.name}
              </h5>
              <h6 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                ID:{details?.idnumber}
              </h6>
              <p>oneday wages {details?.amount}</p>
              <p>advance {details?.advance}</p>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {details?.description}
            </p>
            <a
              style={{ backgroundColor: "green" }}
              onClick={changestatus}
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Verify
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}