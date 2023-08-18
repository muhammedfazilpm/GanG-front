import React from 'react'
import Navbar from './Navbar'
import { useEffect,useState } from 'react'
import { guideRequest } from '../../axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

export default function Orderguide() {
    const [orders,setOrders]=useState([])
    const navigate=useNavigate()
   const getOrder=async (req,res)=>{
    guideRequest({
        url:"/api/guide/getOrder",
        method:'post'

    }).then((response)=>{

        if(response.data.success){
            console.log("order",response.data.data)
            setOrders(response.data.data)

        }else{
          toast.error(response.data.message)
        }
       
    }).catch((err)=>{
        toast.error("something went wrong")
        console.log(err)
        localStorage.removeItem('token')
        navigate('/login')
    })
   
   }
   const order=orders.filter((item)=>item.paymentstatus!=="pending")
    useEffect(()=>{
    getOrder()
    },[])
  return (
    <div>
      <Navbar/>
      
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
            </tr>
        </thead>
        <tbody>
            {order?.map((item)=>(
                  <tr class="bg-gray-100 text-center dark:bg-gray-800">
                  <td class="px-6 text-center py-4 border-b border-gray-300 px-6 py-4 border-r">
                      {item?.guest}
                  </td>
                  <td class="px-6 py-4 border-b border-gray-300 px-6 py-4 border-r">
                      {format(new Date(item?.dateofbook),'dd-MM-yyyy')}
                  </td>
                  <td class="px-6 py-4 border-b border-gray-300 px-6 py-4 border-r">
                      {item?.advance}
                  </td>
                  <td class="px-6 py-4 border-b border-gray-300 px-6 py-4 border-r">
                      {item?.amount-item?.advance}
                  </td>
                  <td class="px-6 py-4 border-b border-gray-300 px-6 py-4 border-r">
                      {item?.numberofguest}
                  </td>
              </tr>

            ))}
          
        </tbody>
    </table>
</div>


    </div>
  )
}
