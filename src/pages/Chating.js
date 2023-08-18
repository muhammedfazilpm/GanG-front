import React, { useEffect } from 'react'
import { useState } from 'react'

export default function Chating({socket,username,room}) {
    const[currentmessage,setCurrentmessage]=useState("")
    const [messagelist,setMessagelist]=useState([])
    const sendmessage=async()=>{
        if(currentmessage!==0){
            const messageData={
                room:room,
                author:username,
                message:currentmessage,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message",messageData)
            setMessagelist((list)=>[...list,messageData])
        }
    }
    useEffect(()=>{
     socket.on("recive_message",(data)=>{
        setMessagelist((list)=>[...list,data])
        console.log(data)

     })
    },[socket])
  return (
    <div>{messagelist.map((message)=>{
        return  <p>{message.message}</p>
    })}
      <input type='text' placeholder='hey' onChange={(event)=>{
        setCurrentmessage(event.target.value)
      }}/>
      <button onClick={sendmessage}>&#9658;</button>
    </div>
  )
}
