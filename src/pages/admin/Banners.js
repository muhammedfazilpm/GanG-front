import React from 'react'
import Navbaradmin from './Navbaradmin'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { hideloading, showloading } from '../../redux/alertSlice'
import Adminfooter from './Adminfooter'

export default function Banners() {
    const dispatch=useDispatch()
    const[guidebanner,setGuidebanner]=useState('')
    const [guestbanner,setGuestbanner]=useState('')  
    const navigate=useNavigate()
    const getbanner=async()=>{
        try {
            dispatch(showloading())

            const response=await axios.get('http://localhost:5000/api/admin/getbanner')
            dispatch(hideloading())
            if(response.data.success){
                setGuidebanner(response.data.data)
                setGuestbanner(response.data.data2)
                
            }
        } catch (error) {
            dispatch(hideloading())
            console.log("error")
            
        }
    }
    useEffect(()=>{
        getbanner()
    },[])
    useEffect(()=>{
        console.log("banner",guidebanner)
    },[guidebanner])
    useEffect(()=>{
        console.log("guest banner",guestbanner)
    },[guestbanner])
  return (
    <div>
        <Navbaradmin/>
        
<section class="bg-white dark:bg-gray-900">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
        <h2 class="max-w-xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Guide Banner</h2>

            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">{guidebanner[0]?.heading}</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">{guidebanner[0]?.description}</p>
            <a href="/admin/addguidebanner" style={{background:'green',color:"white"}} class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Addbanner
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            <a href="" onClick={()=>{navigate("/admin/editGuidebanner",{state:guidebanner[0]})}} style={{background:"black",color:'white'}} class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Editbanner
            </a> 
        </div>
        <div class="lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
    <img src={guidebanner[0]?.guidebanner} alt="mockup" width="300" height="200" />
</div>
              
    </div>
</section>

<section class="bg-white dark:bg-gray-900">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
        <h2 class="max-w-xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Guest Banner</h2>

            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">{guestbanner[0]?.heading}</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Welcome to [Company Name], your gateway to unforgettable travel experiences. We are a leading travel and tour{guestbanner[0]?.description}</p>
            <a style={{background:'green',color:'white'}} href="/admin/Guestbanner" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Add banner
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            <a href="" onClick={()=>{navigate("/admin/editGuidebanner",{state:guidebanner[0]})}}   style={{background:'black',color:'white'}} class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Editbanner
            </a> 
        </div>
        <div  class=" lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
            <img width="300" height="200" src={guestbanner[0]?.image} alt="mockup" class="rounded-lg"/>
        </div>                
    </div>
</section>
<Adminfooter/>
    </div>
    
  )
}
