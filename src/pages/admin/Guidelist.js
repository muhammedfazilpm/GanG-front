import React, { useEffect } from "react";
import Navbaradmin from "./Navbaradmin";
import { useContext } from "react";
import GuideContext from "../context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";
import Adminfooter from "./Adminfooter";

export default function Guidelist() {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const guide = useContext(GuideContext);
  const guides = guide.guide;
  const blockUser = async (id) => {
    try {
      dispatch(showloading())
      const response = await axios.post("/api/admin/blockUser", { id });
   dispatch(hideloading())
      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading())
      toast.error("server problem wait");
    }
  };

  return (
    <div>
      <Navbaradmin />
      <div className="w-full text-center font-family:-moz-initial">
        <h1 className="text-2xl mt-4 mb-6">GUIDE LIST</h1>
      </div>
      <div className="flex justify-center">
        <div className="w-full lg:w-2/3 xl:w-1/2">
          <div style={{ overflowX: "auto" }} className="overflow-x-auto">
            <table
              style={{ overflowX: "auto", textAlign: "center" }}
              className="w-full table-auto border-collapse border border-gray-300"
            >
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">NAME</th>
                  <th className="border p-2">LOCATION</th>
                  <th className="border p-2">EMAIL</th>
                  <th className="border p-2">MOBILE</th>
                  <th className="border p-2">STATUS</th>
                  <th className="border p-2">VIEW</th>
                  <th className="border p-2">Block</th>
                </tr>
              </thead>
              <tbody>
                {guides.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.location}</td>
                    <td className="border p-2">{item.email}</td>
                    <td className="border p-2">{item.phone}</td>
                    <td
                      style={
                        item.isAdminverified
                          ? { color: "green" }
                          : { color: "red" }
                      }
                      className="border p-2"
                    >
                      {item.isAdminverified ? "verified" : "Not verified"}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => {
                          navigate("/admin/viewguide", { state: item });
                        }}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                      >
                        View
                      </button>
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => {
                          blockUser(item._id);
                        }}
                        className={`p-2 rounded-lg text-white ${
                          item.isBlocked ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {item.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Adminfooter/>
    </div>
  );
}
