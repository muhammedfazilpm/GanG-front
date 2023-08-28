import React, { useState } from "react";
import Navbarguest from "./Navbarguest";
import Footerguest from "./Footerguest";
import { guestRequest } from "../../axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"

import io from 'socket.io-client';


export default function Ordersguest() {
  const navigate=useNavigate()
  const socket=io.connect("http://localhost:5000")

  const [orders, setOrders] = useState([]);
  const Navigate = useNavigate();

  const getOrderdetals = async () => {
    guestRequest({
      url: "/api/guest/getOrders",
      method: "post",
    })
      .then((response) => {
        console.log("res", response);
        setOrders(response.data.data);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("guesttoken");
        Navigate("/guest/login");
      });
  };
  useEffect(() => {
    getOrderdetals();
  }, []);

  useEffect(()=>{
    console.log("orders",orders)
  },[orders])
 const successorder=orders.filter(item=>item.paymentstatus!=="pending")

 const startChat=(id)=>{
  socket.emit("join-room",id)
  Navigate('/guest/chat',{state:id})
  
 }
 const sendId=(data)=>{
  console.log("prevdata",data)
  navigate("/guest/getReview",{state: data})
 }
  return (
    <div style={{width:'100%'}}>
      <Navbarguest />
      <div className='w-full text-center 3xl font-bold'>ORDERS</div>

      <div style={{ height: "85vh" }}>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Guest</th>
              <th className="p-2">Location</th>
              <th className="p-2">Date</th>
              <th className="p-2">advance</th>
              <th className="p-2">balance</th>
              <th className="p-2">Chat</th>
              <th className="p-2">Review</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
       {successorder.map((item)=>(
         <tr className="hover:bg-gray-200">
         <td className="p-2">{item.guide}</td>
         <td className="p-2">{item.location}</td>
         <td className="p-2">{format(new Date(item.dateofbook),'dd-MM-yyyy')}</td>
         <td className="p-2">{item.advance}</td>
         <td className="p-2">{item.amount-item.advance}</td>
         <td className="p-2"><button onClick={()=>{startChat(item.guideid)}} type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Chat</button></td>
        
         <td className="p-2">{item?.orderStatus=="Completed"?<button onClick={()=>{sendId(item._id)}} type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Review</button>:<p>{item?.completeCode}</p>}</td>

       </tr>
       ))}
           
            
          </tbody>
        </table>
      </div>

      <Footerguest />
    </div>
  );
}
