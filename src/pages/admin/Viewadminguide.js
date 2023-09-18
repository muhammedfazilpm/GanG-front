import React from "react";
import Navbaradmin from "./Navbaradmin";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "flowbite";
import toast from "react-hot-toast";
import Rating from "../guest/Rating";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";
import Swal from 'sweetalert2'

export default function Viewadminguide() {
  const dispatch=useDispatch()
  const [details, setDetails] = useState({});
  const [review,setReview]=useState([])
  const [avgrating,setRating]=useState(null)
  const navigate = useNavigate();
  const guide = useLocation();
  const guides = guide.state;
  const id = guides._id;
  const getdetails = async () => {
    
    try {
      dispatch(showloading())
      const response = await axios.post("http://localhost:5000/api/admin/getdetails", { id: id });
      dispatch(hideloading())
      setDetails(response.data.data);
      setReview(response.data.reviews)
      setRating(response.data.average)
    } catch (error) {
      dispatch(hideloading())
      console.log(error);
    }
  };

  const changestatus = async () => {
    const result = await Swal.fire({
      title: 'Verify Confirmation',
      text: 'Are you sure you want Verify this guide?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Block',
      cancelButtonText: 'Cancel',
    });
    if(result.isConfirmed){
      try {
        dispatch(showloading())
        const response = await axios.post("http://localhost:5000/api/admin/verifyguide", {
          id: details.guidid,
        });
        dispatch(hideloading())
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/admin/guide");
          window.location.reload()
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideloading())
        toast.error("something went wrong");
      }

    }

   
  };
  useEffect(() => {
    getdetails();
  }, []);

  useEffect(() => {
    console.log("GUIDE", details);
  }, [details]);

  return (
    <div>
      <Navbaradmin />

      <div className="mx-auto grid max-w-4xl grid-cols-12 gap-4 bg-zinc-50 p-1">
  <div className="col-span-12 rounded-lg border border-gray-500 bg-gray-200 p-1 sm:col-span-4">
  <div style={{ display: "flex", marginTop: "3%",textAlign:'center' }}>
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {details ? "" : <p style={{ color: "red" }}>No details added</p>}
          <a href="#">
            <img class="rounded-t-lg" src={details?.idimage} alt="image" />
          </a>
          <div class="p-5">
          <Rating rating={avgrating}/>
          <p>{avgrating}</p>


            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {details?.name}
              </h5>
              
              <h6 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                ID:{details?.idnumber}
              </h6>
              <p>oneday wages {details?.amount}</p>
              <p>advance {details?.advance}</p>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {details?.description}
            </p>
            <a
              style={{ backgroundColor: "green" }}
              onClick={changestatus}
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Verify
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
  </div>
  {review.length!=0?  <div className="col-span-12 rounded-lg border border-gray-400 bg-gray-200 p-1 sm:col-span-7">
  <h2 className="text-xl font-semibold text-slate-800 mb-4">Reviews</h2>
  <div className="grid gap-4">
    {review.map((item) => (
      <div className="rounded-xl border p-4 shadow-md bg-white">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center space-x-3">
            <div className="text-lg font-semibold text-slate-700">{item.guestname}</div>
          </div>
          <div className="flex items-center space-x-3">
            <Rating rating={item.rating} />
            <div className="text-xs text-neutral-500">{item.rating}</div>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-sm text-neutral-600">{item.review}</p>
        </div>

        {/* Additional actions/icons can be added here */}
      </div>
    ))}
  </div>
</div>:''}

  </div>
</div>


      
      
    
  );
}
