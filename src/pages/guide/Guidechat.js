import React, { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { guideRequest } from '../../axios'


export default function Guidechat({ username }) {
  const socket = io.connect("http://localhost:5000");

  const [currentmessage, setCurrentmessage] = useState("");
  const [messagelist, setMessagelist] = useState([]);
  const [recievdmessage,setRecievedmessage]=useState([]);
  const [userid,setUserid]=useState('')
  const location=useLocation()
  const data=location.state
  const sendmessage = async () => {
    if (currentmessage !== 0) {
      const messageData = {
        room: data,
        author: userid,
        message: currentmessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessagelist((list) => [...list, messageData]);
    }
  };
  const getGuide=async()=>{
    


   await guideRequest({
      url:"/api/guide/getsenderId",
      method:'post'

  }).then((response)=>{

      if(response.data.success){
        setUserid(response.data.id)

      }else{
      
      }
     
  }).catch((err)=>{
    
      console.log(err)
  
  
  })


  }
  useEffect(()=>{
    socket.emit("join-room",data)
    getGuide()
  },[])
  

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("recieve guide ",data)
      const data2=data.author
      console.log(data2,"data2")
      if(data2!==userid){
        setRecievedmessage( [data.message]);

      }
     
    });
  });
  return (
    <div>
        <Navbar/>
        
      <div className="w-full flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen">
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <span className="absolute text-green-500 right-0 bottom-0">
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt=""
                class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-700 mr-3">Anderson Vanhron</span>
              </div>
              <span className="text-lg text-gray-600">Guest</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          id="messages"
          className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          <div className="chat-message">
            <div className="flex items-end"></div>
          </div>
          <div className="chat-message">
            <div className="flex items-end justify-end"></div>
          </div>
          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
        
               {recievdmessage}
              </div>
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile"
                className="w-6 h-6 rounded-full order-1"
              />
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              {messagelist.map((message)=>{
             return   <div>
                
        <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
              {message.message}     
        </span> 
   
                  
                </div>
                 })}
              </div>
              <img
                src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile"
                className="w-6 h-6 rounded-full order-2"
              />
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end"></div>
          </div>
          <div className="chat-message">
            <div className="flex items-end justify-end"></div>
          </div>
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <input
            onChange={(event)=>{
              setCurrentmessage(event.target.value)
            }}
              type="text"
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button onClick={sendmessage}
              style={{background:'blue'}}
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
