import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Button } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import Rating from "../guest/Rating";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";
import Guidefooter from "./Guidefooter";


export default function Profile() {
  const dispatch=useDispatch()
  const [profile, setData] = useState([]);
  const [Details, setdetails] = useState([]);
  const [review,setReview]=useState([])
  const[rating,setRating]=useState(null)
  const getProfile = async () => {
    try {
      dispatch(showloading())
      const response = await axios.post(
        "http://globalone.shop/api/guide/getProfile",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideloading())
      setData(response.data.data);
      setdetails(response.data.details);
      setReview(response.data.reviews)
      setRating(response.data.average)
    } catch (error) {
      dispatch(hideloading())
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    console.log("datas", profile);
    console.log("details", Details);
    console.log("review",review)
  }, [profile, Details,review]);
  return (
    <div>
      <Navbar />
     
      <div className="mx-auto grid max-w-4xl grid-cols-12 gap-2 bg-zinc-50 p-1">
  <div className="col-span-12 sm:col-span-8 flex flex-col h-full">
    <div className="rounded-lg border border-gray-500 bg-gray-200 p-0 flex-grow">
      <div
        style={{ backgroundColor: "#002242", color: "white" }}
        className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center justify-center">
            <img
              className="w-20 h-20 rounded-full object-cover object-center border-4 border-blue-500"
              src={profile?.profile}
              alt="Profile"
            />
          </div>
          <h2 className="mt-4 text-white text-lg font-semibold text-center">
            {profile.name}
          </h2>
          <Rating rating={rating} />
          <p className="text-white text-center">{profile.email}</p>
          <p className="text-white text-center">{profile.phone}</p>

          <div className="mt-4">
            <p className="text-white">{Details?.description}</p>
          </div>
          <div className="mt-6">
            <h1 className="text-white text-center">
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
        <a className="text-blue-500 hover:underline text-center block">
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
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <h2 className="text-lg font-semibold mb-2">ID NUMBER</h2>
          <p className="text-gray-600 text-sm">{Details?.idnumber}</p>
        </div>
      </div>
    </div>
  </div>
  <div style={{ width: "100%" }} className="col-span-12 sm:col-span-4 flex flex-col">
    <div style={{ width: "100%" }} className="rounded-lg border border-gray-400 bg-gray-200 p-0 flex-grow mx-auto text-center overflow-auto">
      {review.map((item) => (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mx-auto text-center mb-4">
          <div className="flex items-center p-2 mx-auto text-center">
            <div>
              <p className="font-semibold text-gray-800">{item?.guestname}</p>
              <p className="text-sm text-gray-600">{item?.rating}</p>
              <Rating rating={item?.rating} />
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-800">{item?.review}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

    <Guidefooter/>
    </div>
  );
}
