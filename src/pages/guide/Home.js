import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import 'tailwindcss/tailwind.css';
import Navbar from './Navbar';
import { hideloading, showloading } from '../../redux/alertSlice';
import Guidefooter from './Guidefooter';



export default function Home() {  
  const dispatch=useDispatch()
  
  const[banner,bannerSet]=useState([])

 
  
const getData=async()=>{
  try {
    dispatch(showloading())
    const response=await axios.post('http://globalone.shop/api/guide/getUser',{},
    {
      headers:{
          Authorization:'Bearer '+ localStorage.getItem('token') 
      }

    })
dispatch(hideloading())
  if(response.data.success){
    bannerSet(response.data.banner)
  }
    
  } catch (error) {
    dispatch(hideloading())
    console.log(error)
  }
}

  useEffect(()=>{
    getData()
  },[])
  useEffect(()=>{
    console.log("home banner",banner)
  },[banner])

 

  return (
    
   <>  
   <Navbar/>
   

   <div className="bg-gray-100 w-full min-h-screen flex flex-col items-center justify-center">
  
   <div className="mb-8 w-full max-w-lg">
  <div className="relative h-0" style={{ paddingBottom: '56.25%' }}>
    <img
      src={banner?.guidebanner}
      alt="Sample Image"
      className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
    />
  </div>
</div>
  
  
  <div className="text-center">
    <h1 className="text-3xl font-semibold mb-4">{banner?.heading}</h1>
    <p className="text-gray-700 text-lg">
      {banner?.description}
    </p>
  </div>
</div>
<Guidefooter/>
    </>   
   
    
  )
}
