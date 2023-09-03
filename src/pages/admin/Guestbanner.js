import React from 'react'
import Navbaradmin from './Navbaradmin'
import axios from 'axios';
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideloading, showloading } from '../../redux/alertSlice';


export default function Guestbanner() {
  const dispatch=useDispatch()
    const navigate=useNavigate()
    const [bannername, setBanner] = useState("");
    const [image, setSelectedImage] = useState([]);
    const [bannerdes, setBannerdiscr] = useState("");
    
    
    const handleInputchange = (e) => {
      setBanner(e.target.value);
    };
  
    const handleInputchange1 = (e) => {
      setBannerdiscr(e.target.value);
    };
  
    const handleImagechange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const selectedImages = Array.from(files);
            setSelectedImage(selectedImages);
        }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault(); 
      try {
        dispatch(showloading())
        const formData = new FormData()
      
        formData.append("heading", bannername);
        for(let i=0;i<image.length;i++){
            formData.append("image", image[i]);

        }
        
        formData.append("description", bannerdes);
       
       
      
       const response = await axios.post("/api/admin/addguestbanner", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: "Bearer " + localStorage.getItem("admintoken")
    },
  });
  dispatch(hideloading())
  if(response.data.success){
        toast.success(response.data.message)
        navigate('/admin/banners')
  }else{
    toast.error("Please try again")
  }
        
      } catch (error) {
        dispatch(hideloading())
        toast.error("something went wrong try again")
      }
    };
  
    return (
      <div>
        <Navbaradmin />
       
  
        <div className="flex items-center  justify-center p-12">
            
          <div className="mx-auto max-w-sm w-full max-w-[550px]">
            
            <form>
              <div className="mb-5 text-center">
              <label style={{color:"red"}}
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Guest banner
                </label>

                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Banner head
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter the heading ....."
                  value={bannername}
                  onChange={handleInputchange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
  
              <div className="mb-5 text-center">
                <label
                  htmlFor="image"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Banner image
                </label>
                <input
                   type="file"
                   id="image"
                   accept="image/*"
                   name="myFile"
                  onChange={handleImagechange}
                  multiple
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
  
              <div className="mb-5">
                <label
                  htmlFor="message"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Banner description
                </label>
                <textarea
                  rows="4"
                  name="message"
                  id="message"
                  placeholder="enter your description.."
                  value={bannerdes}
                  onChange={handleInputchange1}
                  className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                ></textarea>
              </div>
  
              <div>
                <button
                  onClick={handleSubmit}
                  style={{ background: '#212937' }}
                  className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}
