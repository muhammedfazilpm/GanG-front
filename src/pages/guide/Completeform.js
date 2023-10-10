import React from 'react'
import Navbar from './Navbar'
import { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideloading, showloading } from '../../redux/alertSlice'

export default function Completeform() {
  const navigate=useNavigate()
  const location=useLocation()
  const data=location.state
  const dispatch =useDispatch()
  const [otp,setOtp]=useState("")
  const handleinputchange=(e)=>{
    setOtp(e.target.value)
  }
  const handleSubmit=async()=>{
   
    try {
      dispatch(showloading())
      const response=await axios.post('https://globalone.shop/api/guide/checkcode',{otp,data})
      if(response.data.success){
        dispatch(hideloading())
        toast.success(response.data.message)
        navigate('/orders')

      }else{
        dispatch(hideloading())
        toast.error(response.data.message)
      }
      
    } catch (error) {
      dispatch(hideloading())
      toast.error("try again")
    }
  }
  return (<>
    <Navbar/>
 <div className='flex items-center justify-center min-h-screen from-gray-800 via-greeen-300 to-blue-500 bg-gradient-to-br'>
            <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl'>
                <div className='max-w-md mx-auto space-y-6'>
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div className="mx-auto max-w-screen-sm text-center">
                        <div className="mb-3">
                          
            <label htmlFor="email2" className="text-sm text-navy-700 dark:text-white font-bold">Enter the Completion code </label>
            <input
                type="number"
                id="otp"
                placeholder="enter the code"
                onChange={handleinputchange}
                value={otp}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
            />
        </div>
        <button onClick={handleSubmit} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Enter</button>        
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    </>

      
   
  )
}
