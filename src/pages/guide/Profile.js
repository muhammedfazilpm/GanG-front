import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Button } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Profile() {
  const [profile, setData] = useState([]);
  const [Details, setdetails] = useState([]);
  const getProfile = async () => {
    try {
      const response = await axios.post(
        "/api/guide/getProfile",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setData(response.data.data);
      setdetails(response.data.details);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    console.log("datas", profile);
    console.log("details", Details);
  }, [profile, Details]);
  return (
    <div>
      <Navbar />
      <div class="">
        <div
          style={{
            backgroundColor: "white",
            textAlign: "center",
            color: "#F33A6A",
            fontSize: "large",
            fontWeight:'bolder'
          }}
          class="bg-white shadow-md p-4"
        >
          <h2>PROFILE</h2>

          <div
            style={{ backgroundColor: "#002242",color:'white' }}
            className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div style={{color:'white'}} className="flex items-center justify-center">
                <img
                  className="w-20 h-20 rounded-full object-cover object-center border-4 border-blue-500"
                  src={profile?.profile}
                  // alt="Profile"
                />
              </div>
              <h2 style={{color:'white'}} className="mt-4 text-gray-800 text-lg font-semibold text-center">
                {profile.name}
              </h2>
              <p style={{color:'white'}} className="text-gray-600 text-center">{profile.email}</p>
              <p style={{color:'white'}} className="text-gray-600 text-center">{profile.phone}</p>

              <div className="mt-4">
                <p style={{color:'white'}} className="text-gray-600">{Details?.description}</p>
              </div>
              <div className="mt-6">
               

                <h1 style={{color:'white'}} className="text-gray-600 text-center">
                  {Details?.location} RS {Details?.amount}
                </h1>

                {Details == null && (
                  <Link to="/adDetails">
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "red",
                        marginLeft: "15px",
                        marginRight: "10px",
                      }}
                      size={10}
                    >
                      Add Id
                    </Button>
                  </Link>
                )}
                <Link to="/editprofile">
                  <Button
                    type="primary"
                    style={{ backgroundColor: "green", marginLeft: "10px" }}
                    size={10}
                  >
                    EDIT
                  </Button>
                </Link>
              </div>
            </div>
            <a
                 
                  className="text-blue-500 hover:underline text-center block"
                >
                  ID DETAILS
                </a>
            <div
              style={{ width: "100%", height: "100%" }}
              className="bg-white rounded-lg shadow-md p-4 w-48"
            >
              <div className="mb-2">
                <img
                  src={Details?.idimage}
                  alt="ID Image"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <h2 className="text-lg font-semibold mb-2">ID NUMBER</h2>
              <p className="text-gray-600 text-sm">{Details?.idnumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
