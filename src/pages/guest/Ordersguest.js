import React, { useState } from "react";
import Navbarguest from "./Navbarguest";
import Footerguest from "./Footerguest";
import { guestRequest } from "../../axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";



export default function Ordersguest() {
  const dispatch=useDispatch()
  const navigate=useNavigate()


  const [orders, setOrders] = useState([]);
  const Navigate = useNavigate();

  const getOrderdetals = async () => {
    dispatch(showloading())
    guestRequest({
      url: "http://globalone.shop/api/guest/getOrders",
      method: "post",
    })
      .then((response) => {
        dispatch(hideloading())
        setOrders(response.data.data);
      })
      .catch((err) => {
        dispatch(hideloading())
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

 const startChat=(id,userid)=>{
  Navigate('/guest/chat',{state:{id:id,guestid:userid}})
  
 }
 const sendId=(data)=>{
  navigate("/guest/getReview",{state: data})
 }
  return (
    <div className="w-full h-screen">
    <Navbarguest />
    <div className="w-full text-center text-xl font-bold py-3">ORDERS</div>

    <div className="h-screen overflow-x-auto">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Guide</th>
            <th className="p-2">Location</th>
            <th className="p-2">Date</th>
            <th className="p-2">Advance</th>
            <th className="p-2">Balance</th>
            <th className="p-2">Chat</th>
            <th className="p-2">Review</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {successorder.map((item) => (
            <tr className="hover:bg-gray-200" key={item._id}>
              <td className="p-2">{item.guide}</td>
              <td className="p-2">{item.location}</td>
              <td className="p-2">{format(new Date(item.dateofbook), 'dd-MM-yyyy')}</td>
              <td className="p-2">{item.advance}</td>
              <td className="p-2">{item.amount - item.advance}</td>
              <td className="p-2">
                <button
                  onClick={() => {
                    startChat(item._id, item.guestid);
                  }}
                  type="button"
                  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto"
                >
                  Chat
                </button>
              </td>

              <td className="p-2">
                {item?.orderStatus === 'Completed' ? (
                  <button
                    onClick={() => {
                      sendId(item._id);
                    }}
                    type="button"
                    className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto"
                  >
                    Review
                  </button>
                  
                ) : (
                  <p>{item?.completeCode}</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <Footerguest  />
  </div>
  );
}
