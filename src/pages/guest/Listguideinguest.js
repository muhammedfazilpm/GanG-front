import React from "react";
import Navbarguest from "./Navbarguest";
import { useContext } from "react";
import GuideContext from "../context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";
export default function Listguideinguest() {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const Viewaguide = async (data) => {
    dispatch(showloading())
    const response = await axios.post("/api/guest/sendDetails", { data });
    dispatch(hideloading())
    if (response.data.success) {
      navigate("/guest/guideView", { state: response.data });
    }
  };
  let errors=false
  
  const localdata2 = localStorage.getItem("formData");
  const formData = JSON.parse(localdata2);
  const guide = useContext(GuideContext);
  const guidelists = guide.guide;
  const selectedguide2 = guidelists.filter(
    (item) => item.location == formData?.location
  );
  const selectedguide = selectedguide2.filter(
    (item) =>
      item.isBlocked === false &&
      item.isAdminverified === true &&
      item.isVerfied === true
  );
if(selectedguide.length==0){
  errors=true
  

}
  const sendOrder = async (data) => {

    try {
      dispatch(showloading())
      const response = await axios.post(
        "/api/guest/bookorder",
        { data: data, formData: formData },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("guesttoken"),
          },
        }
      );
      dispatch(hideloading())
      if (response.data.success) {
        toast.success(response.data.message);
        razorpayPayment(response.data.data)
        
       
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
    dispatch(hideloading())
      toast.error("something went wrong");
    }
  };

  function razorpayPayment(order) {
     console.log("amount",order.advance)
    var options = {
        "key": "rzp_test_34XnG5Q61yIlEw",
        "amount": order.advance*100,
        "currency": "INR",
        "name": "GanG guide booking",
        "description": "pay the amount to confirm booking",
        "image": "/user/images/online-shopping.png",
        "order_id": order.id,
        // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "handler": function (response) {
            verifyPayment(response, order)
        },
        "prefill": {
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }

    };
    
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
}
const verifyPayment = (payment, order) => {

PaymentUpdate(payment,order)
}

  const PaymentUpdate=async(payment,order)=>{
    try {
     const response= await axios.post('/api/guest/paymentUpdate',{payment,order})
     if(response.data.success){
      toast.success(response.data.message)
      localStorage.removeItem("formData");
      navigate('/guest/orders')
      
     }else{
         toast.error(response.data.message)
     }
      
    } catch (error) {
      toast.error('something went wrong')
    }

  }


  return (
    <div>
      <Navbarguest />
      {errors&&<p className="w-full text-center text-red-500">There is no guide present In the selected location</p>}
     
      <div className="flex justify-center">
        <div className="w-full lg:w-2/3 xl:w-1/2">
          <table
            style={{ width: "100%" }}
            className="min-w-full table-auto border-collapse border border-gray-300"
          >
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">View</th>
                <th className="border p-2">Book</th>
              </tr>
            </thead>
            <tbody>
              {selectedguide?.map((item, index) => (
                <tr
                  style={{ textAlign: "center" }}
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border p-2">{item?.name}</td>
                  <td className="border p-2">{item?.location}</td>
                  <td className="border p-2">
                    <button className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      onClick={() => {
                        Viewaguide(item);
                      }}
                      
                    >
                      View
                    </button>
                  </td>

                  <td className="border p-2">
                    <button
                    className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      onClick={() => {
                        sendOrder(item?._id);
                      }}
                     
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
