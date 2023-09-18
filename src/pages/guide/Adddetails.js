import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";


export default function Adddetails() {
  const dispatch=useDispatch()
  const [selectedImage, setSelectedImage] = useState(null);
 
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");

  const [location,setLocation]=useState([])
  const navigate=useNavigate()


  const getLocation=async()=>{
    
    try {
      dispatch(showloading())
       const response=await axios.post('http://localhost:5000/api/guide/getlocations')
       dispatch(hideloading())
       setLocation(response.data.data)
       
    } catch (error) {
      dispatch(hideloading())
        console.log("getlocation",error)
    }
  }
 
  useEffect(()=>{
console.log("location",location)
  },[location])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showloading())
        
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('place', selectedOption);
        formData.append('fullname', inputValue);
        formData.append('idnumber', inputValue1);
        formData.append('description', inputValue2);
        formData.append('amount', inputValue3);

        
        
        const response = await axios.post('http://localhost:5000/api/guide/addDetails', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + localStorage.getItem("token")  
            
          },
        });
        if(response.data.success){
          dispatch(hideloading())
 toast.success(response.data.message)
 navigate('/profile')
        }
      else{
        dispatch(hideloading())
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideloading())
      toast.error("something went wrong")
      console.log(error);
    }
  };
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };
  const handleInputChange3 = (e) => {
    setInputValue3(e.target.value);
  };
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  
  useEffect(()=>{
   getLocation()
  },[])
  return (
    <div>
      <Navbar />
     
      <div style={{textAlign:'center'}} className="p-4">
     <p style={{color:'red'}}>Enter the details properly you can upload details only once</p> 
        <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label
              htmlFor="input"
              className="block text-gray-700 font-bold mb-2"
            >
              ENTER NAME ASPER THE ID
            </label>
            <input
              type="text"
              id="input"
              className="border border-gray-300 p-2 w-full rounded"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          

          <div className="mb-4">
            <label
              htmlFor="input"
              className="block text-gray-700 font-bold mb-2"
            >
              ENTER THE ID CARD NUMBER
            </label>
            <input
              type="text"
              id="input"
              className="border border-gray-300 p-2 w-full rounded"
              value={inputValue1}
              onChange={handleInputChange1}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              UPLOAD YOUR ID CARD PHOTO
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleImageChange}
              name="myFile"
            />
            {selectedImage && (
              <img src={selectedImage} alt="Selected" className="mt-2" />
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="dropdown"
              className="block text-gray-700 font-bold mb-2"
            >
              SELECT YOUR PLACE
            </label>
            <select
              id="dropdown"
              className="border border-gray-300 p-2 w-full rounded"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="wayanad">wayanad</option>
              
            <label
              htmlFor="input"
              className="block text-gray-700 font-bold mb-2"
            >
              ENTER THE ID CARD NUMBER
            </label>
            <input
              type="text"
              id="input"
              className="border border-gray-300 p-2 w-full rounded"
              value={inputValue2}
              onChange={handleInputChange2}
            />
              
             {location.map((item)=>(
               <option key={item.id} value={item.value}>{item}</option>
               
             ))}

              
             
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="input"
              className="block text-gray-700 font-bold mb-2"
            >
              ENTER THE AMOUNT YOU NEEDED FOR ONE DAY
            </label>
            <input
              type="text"
              id="input"
              className="border border-gray-300 p-2 w-full rounded"
              value={inputValue3}
              onChange={handleInputChange3}
            />
          </div>

          <button
            style={{ backgroundColor: "red" }}
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
