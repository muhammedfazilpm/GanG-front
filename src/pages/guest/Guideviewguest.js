import React from "react";
import Navbarguest from "./Navbarguest";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from 'axios'
import { useLocation } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";

export default function Guideviewguest() {
  const dispatch=useDispatch()
  const[rating,setRating]=useState(null)
  const [review,setReview]=useState([])
 
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoBack = () => {
    navigate("/guest/guidelist");
  };
  const itmData = location.state.data;
  console.log("dddd", itmData);
  const id=itmData._doc.guidid
  const getReview=async()=>{
    try {
      dispatch(showloading())
 const response=await axios.post('/api/guest/getReview',{id})
 if(response.data.success){
  dispatch(hideloading())
  setReview(response.data.data)
  setRating(response.data.rate)
 }
 else{
  dispatch(hideloading())
 }
      
    } catch (error) {
      dispatch(hideloading)
      console.log(error)
      
    }

  }
//   useEffect(()=>{
//  console.log("review",review)
//   },[review])
  useEffect(()=>{
    getReview()
  },[])
  return (
    <div>
      <Navbarguest />
      <div className="mx-auto grid max-w-4xl grid-cols-12 gap-4 bg-zinc-50 p-1 mt-8">
      
      <div className="col-span-12 rounded-lg border border-gray-500 bg-gray-200 p-2 sm:col-span-8">
      <div>
        <div
        >
          <a
             class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={itmData?.profile}
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <div>
                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Name : {itmData?.name}
                </h5>
                
                <h5 class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">
                  Location : {itmData?._doc.location}

                </h5>
              </div>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {rating}
                
              </p>
          <Rating rating={rating}/>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                advance {itmData?._doc.advance}
              </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                amount {itmData?._doc.amount}
              </p>

              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {itmData?._doc.description}
              </p>

              <button
                onClick={handleGoBack}
                style={{
                  background: "maroon",
                  padding: "0.2cm",
                  borderRadius: "0.2cm",
                  color: "wheat",
                }}
              >
                Go back
              </button>
            </div>
          </a>
          
        </div>
       
        
      </div>
      </div>
      
      <div className="col-span-12 rounded-lg border border-gray-500 bg-gray-200 p-1 mt-0 sm:col-span-8">
{review.map((item)=>(
   <div className='flex items-center justify-center mt-2 '>
   <div className="rounded-xl border p-5 shadow-md w-9/12 bg-white">
     <div className="flex w-full items-center justify-between border-b pb-3 ">
       <div className="flex items-center space-x-3">
         <div className="h-8 w-8 rounded-full bg-slate-400" ></div>
         <div className="text-lg font-bold text-slate-700">{item?.guestname}</div>
       </div>
       <div className="flex items-center space-x-8">
         <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">{item?.rating}</button>
         <Rating rating={item?.rating}/>


       </div>
     </div>

     <div className="mt-4 mb-6">
       {/* <div className="mb-3 text-xl font-bold">Nulla sed leo tempus, feugiat velit vel, rhoncus neque?</div> */}
       <div className="text-sm text-neutral-600">{item?.review}</div>
     </div>

     <div>
       <div className="flex items-center justify-between text-slate-500">
         <div className="flex space-x-4 md:space-x-8">
           <div className="flex cursor-pointer items-center transition hover:text-slate-600">
             {/* <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
               <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
             </svg>
             <span>125</span> */}
           </div>
           <div className="flex cursor-pointer items-center transition hover:text-slate-600">
             {/* <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
               <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
             </svg>
             <span>4</span> */}
           </div>
         </div>
       </div>
     </div>
   </div>
   
 </div>
))}
     
    
    
    
      </div>
     
    </div>
      
    </div>
    
  );
}
