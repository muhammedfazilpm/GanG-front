import React from 'react'
import Navbaradmin from './Navbaradmin'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideloading, showloading } from '../../redux/alertSlice'
import Adminfooter from './Adminfooter'

export default function Editguidebanner() {
  const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    const data=location.state
    const [bannername, setBanner] = useState(data.heading);
  const [image, setSelectedImage] = useState(data.guidebanner);
  const [bannerdes, setBannerdiscr] = useState(data.description);
  const handleInputchange = (e) => {
    setBanner(e.target.value);
  };

  const handleInputchange1 = (e) => {
    setBannerdiscr(e.target.value);
  };

  const handleImagechange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("imagefile",file)
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      
      const formData = new FormData()
    
      formData.append("heading", bannername);
      formData.append("image", image);
      formData.append("description", bannerdes);
     
     
    dispatch(showloading())
     const response = await axios.post("https://globalone.shop/api/admin/addbanner", formData, {
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
  toast.error(response.data.message)
}
      
      console.log("how are you",formData)
    } catch (error) {
      dispatch(hideloading())
      toast.error("something went wrong try again")
    }
  };
    console.log("editing data",data)
  return (
    <div>
        <Navbaradmin/>
     <div className="flex items-center justify-center p-12">
        <div className="mx-auto max-w-sm w-full max-w-[550px]">
          <form>
            <div className="mb-5 text-center">
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
                defaultValue={data.heading}
                value={bannername}
                onChange={handleInputchange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5 text-center">
                <img src={data.guidebanner} width="100" height="100"/>
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
                defaultValue={data.description}
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
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Adminfooter/>
    </div>
    
  )
}
