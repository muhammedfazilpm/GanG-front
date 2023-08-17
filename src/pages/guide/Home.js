import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
// import { Button } from 'antd'
import image from './assets/homeimg.jpg'
import 'tailwindcss/tailwind.css';
import Navbar from './Navbar';



export default function Home() {
  

 
  
const getData=async()=>{
  try {
    const response=await axios.post('/api/guide/getUser',{},
    {
      headers:{
          Authorization:'Bearer '+ localStorage.getItem('token') 
      }

    })

    console.log(response.data)
    
  } catch (error) {
    console.log(error)
  }
}

  useEffect(()=>{
    getData()
  },[])

 

  return (
    
   <>  
   <Navbar/>
   

   <div className="bg-gray-100 w-full min-h-screen flex flex-col items-center justify-center">
  
   <div className="mb-8 w-full max-w-lg">
  <div className="relative h-0" style={{ paddingBottom: '56.25%' }}>
    <img
      src={image}
      alt="Sample Image"
      className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
    />
  </div>
</div>
  
  
  <div className="text-center">
    <h1 className="text-3xl font-semibold mb-4">Welcome to Our Guest and Guide</h1>
    <p className="text-gray-700 text-lg">
    Our guest-friendly guide side offers a welcoming experience to users who haven't yet registered. Explore a curated selection of content, gain read-only access to articles and resources, and discover the value our platform provides. If you're ready for more, sign up to unlock premium content, personalized recommendations, and special promotions. Navigate with ease, search for topics of interest, and enjoy a seamless user experience. Your privacy is important to us, and we're here to support you. Start your journey today!
    </p>
  </div>
</div>
<footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="mt-2">
          <a
            href="/privacy-policy"
            className="text-gray-300 hover:text-gray-100 mr-4"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="text-gray-300 hover:text-gray-100"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>



    </>   
   
    
  )
}
