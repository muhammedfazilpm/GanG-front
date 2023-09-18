import React, { useEffect, useState } from "react";
import gangLogo from "./assets/gang logo.PNG";
import axios from "axios";
import { Button } from "antd";
import Navbaradmin from "./Navbaradmin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";
import Addlocation from "./Addlocation";
import Adminfooter from "./Adminfooter";

export default function Location() {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      dispatch(showloading())
      const response = await axios.post("http://localhost:5000/api/admin/getlocation");
dispatch(hideloading())
      setData(response.data.data);
    } catch (error) {
      dispatch(hideloading())
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("updated", data);
  }, [data]);
  const editPage = (data) => {
    console.log("fgklhelsj", data);

    navigate("/admin/editlocation", { state: data });
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <Navbaradmin />

        <p className="text-center mt-4">Location</p>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            style={{ textAlign: "center" }}
            className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  STATE
                </th>
                <th scope="col" className="px-6 py-3">
                  DISTRICT
                </th>
                <th scope="col" className="px-6 py-3">
                  EDIT
                </th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: "inherit", fontStyle: "normal" }}>
              {data.map((location, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "bg-white"
                  }
                >
                  <td className="px-6 py-3">{location.state}</td>
                  <td className="px-6 py-3">{location.district.join(", ")}</td>
                  <td className="px-6 py-3">
                    <Button type="button" onClick={() => editPage(location)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
              <td>
                {" "}
                <button
                  style={{ backgroundColor: "red", marginLeft: "20px" }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <a href="/admin/addlocation">ADD</a>
                </button>
              </td>
            </tbody>
          </table>
        </div>
      </div>
      <Adminfooter/>
    </>
  );
}
