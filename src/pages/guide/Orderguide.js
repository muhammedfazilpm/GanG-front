import React from 'react'
import Navbar from './Navbar'
import { useEffect,useState } from 'react'
import { guideRequest } from '../../axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { hideloading, showloading } from '../../redux/alertSlice'


export default function Orderguide() {
  const dispatch=useDispatch()
    const [orders,setOrders]=useState([])
    const navigate=useNavigate()
    const sendCompletecode=async(id)=>{
        
       try {
        dispatch(showloading())
        const response=await axios.post("http://localhost:5000/api/guide/sendcomplete",{id})
        if(response.data.success){
          dispatch(hideloading())
            toast.success(response.data.message)
            navigate("/guide/ordercomplete",{state:response.data.data})
        }
        else{
          dispatch(hideloading())
            toast.error(response.data.message)
        }
        
       } catch (error) {
        dispatch(hideloading())
        toast.error("try again")
        
       }
    }
   
   const getOrder=async ()=>{
    dispatch(showloading())
    guideRequest({
        url:"http://localhost:5000/api/guide/getOrder",
        method:'post'

    }).then((response)=>{
      dispatch(hideloading())

        if(response.data.success){
          dispatch(hideloading())
            setOrders(response.data.data)

        }else{
          dispatch(hideloading())
          toast.error(response.data.message)
        }
       
    }).catch((err)=>{
        toast.error("something went wrong")
        console.log(err)
        localStorage.removeItem('token')
        navigate('/login')
    })
   
   }
   const order2=orders.filter((item)=>item.paymentstatus!=="pending")
   const order=order2.sort((a,b)=>{
    const dateA=new Date(a.dateofbook)
    const dateB=new Date(b.dateofbook)
    return dateA-dateB
   })
    useEffect(()=>{
    getOrder()
    },[])
    const startChat=(id,guide)=>{
     

      navigate("/guide/chat",{state:{id,guide}})
    }

// Convert to Date object
const date = new Date();


const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const hours = String(date.getUTCHours()).padStart(2, '0');
const minutes = String(date.getUTCMinutes()).padStart(2, '0');
const seconds = String(date.getUTCSeconds()).padStart(2, '0');


const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  return (
    <div >
      <Navbar/>
      
    <div className='w-full text-center 3xl font-bold'>ORDERS</div>
      
      <div class="relative overflow-x-auto p-0.5">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse">
        <thead class="text-xs text-center text-gray-900 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 border-b border-gray-300">
                    Guest name
                </th>
                <th scope="col" class="px-6 py-3 border-b border-gray-300">
                    Date
                </th>
                <th scope="col" class="px-6 py-3 border-b border-gray-300">
                    Advance
                </th>
                <th scope="col" class="px-6 py-3 border-b border-gray-300">
                    Balance
                </th>
                <th scope="col" class="px-6 py-3 border-b border-gray-300">
                    Number of guests
                </th>
                <th scope="col" class="px-6 py-3 border-b border-gray-300">
                    Make complete
                </th>
                <th scope="col" class="px-6 py-3 border-b border-gray-300">
                    Chat
                </th>



            </tr>
        </thead>
        <tbody>
  {order?.map((item, index) => (
    <tr key={index} class="bg-gray-100 text-center dark:bg-gray-800">
      <td class="px-6 text-center py-4 border-b border-gray-300 px-6 py-4 border-r">
        {item?.guest}
      </td>
      <td class="px-6 py-4 border-b border-gray-300 px-6 py-4 border-r">
        {format(new Date(item?.dateofbook), 'dd-MM-yyyy')}
      </td>
      <td class="px-6 py-4 border-b border-gray-300 px-6 py-4 border-r">
        {item?.advance}
      </td>
      <td class="px-6 py-4 border-b border-gray-300 px-6 py-4 border-r">
        {item?.amount - item?.advance}
      </td>
      <td class="px-6 py-4 border-b border-gray-300 px-6 py-4 border-r">
        {item?.numberofguest}
      </td>
      
      <td class="px-6 py-4 border-b border-gray-300 px-6 py-4 border-r">

        {item?.dateofbook <=formattedDate&&item.orderStatus==="Not completed" ? ( 
          <button
          onClick={()=>{sendCompletecode(item._id)}}
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:from-red-600 hover:via-red-500 hover:to-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Complete
          </button>
        ) : (
          <span>-</span>
        )}
      </td>
      <td class="px-6 py-4 border-b border-gray-300 px-6 py-4 border-r">
      <button onClick={()=>{startChat(item._id,item.guideid)}} type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Chat</button>
       
      </td>

    </tr>
  ))}
</tbody>

    </table>
</div>


    </div>
  )
}
