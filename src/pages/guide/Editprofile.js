import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { guideRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
// Initialization for ES Users
import {
  Input,
  initTE,
} from "tw-elements";
import { hideloading, showloading } from "../../redux/alertSlice";

initTE({ Input });


export default function Editprofile() {
  const dispatch=useDispatch()
  const [guide, setGuide] = useState([]);
  const [details,setDetails]=useState([])
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3,setInputValue3]=useState("")
  const [error,setError]=useState(false)
  
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };
  const handleInputChange3=(e)=>{
    setInputValue3(e.target.value)
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(selectedImage===null){
      setError(true)
    }
    try {
      dispatch(showloading())
      const formData = new FormData();
      formData.append("name", inputValue);
      formData.append("phone", inputValue2);
      formData.append("amount", inputValue3);
      formData.append("image", selectedImage);
      const response = await axios.post("http://localhost:5000/api/guide/editprofile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.success) {
        dispatch(hideloading())
        toast.success(response.data.message);
        navigate("/profile");
      } else {
        dispatch(hideloading())
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading())
      console.log(error);

      toast.error("upload a image");
    }
  };
  const getUser=async()=>{
    dispatch(showloading())
    guideRequest({
      url: "/api/guide/getProfile",
      method:'post'
    }).then((response)=>{
      dispatch(hideloading())
      setGuide(response.data.data);
      setDetails(response.data.details)
    }).catch((err)=>{
      dispatch(hideloading())
      localStorage.removeItem('token')
      navigate('/login')
    })
  }

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    console.log("guidea", guide);
  }, [guide]);
  return (
    <>
      <Navbar />
      <div class="max-w-md mx-auto p-4">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="name"
            >
              Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              defaultValue={inputValue ? { inputValue } : guide.name}
              onChange={handleInputChange}
              
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="phoneNumber"
            >
              Phone Number
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="tel"
              defaultValue={inputValue2 ? { inputValue2 } : guide.phone}
              onChange={handleInputChange2}
              maxLength="10"
              data-te-input-showcounter="true"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="phoneNumber"
            >
              AMOUNT
            </label>
            <input
            required='true'
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="Number"
              defaultValue={inputValue3 ? { inputValue3 } : details.amount}
              onChange={handleInputChange3}
            />
          </div>
          <div class="mb-4">
            {error&&<p className="text-red-500">image not selected</p>}
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="profilePicture"
            >
              Profile Picture
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="profilePicture"
              type="file"
              accept="image/*"
              name="myFile"
              onChange={handleImageChange}
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              style={{ backgroundColor: "red", marginBottom: "2px" }}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
