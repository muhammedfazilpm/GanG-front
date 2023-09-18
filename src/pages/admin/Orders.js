import React from 'react'
import Navbaradmin from './Navbaradmin'
import { useEffect,useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import {format} from 'date-fns'
import { useDispatch } from 'react-redux'
import { hideloading, showloading } from '../../redux/alertSlice'
import Adminfooter from './Adminfooter'

export default function Orders() {
    const dispatch=useDispatch()
    const[order,setOrder]=useState([])
const getOrders=async()=>{
    try {
        dispatch(showloading())
        const response=await axios.get('http://localhost:5000/api/admin/getOrders')
        dispatch(hideloading())
        if(response.data.success){
               setOrder(response.data.data)
        }
        else{
            toast.error(response.data.message)
        }
    } catch (error) {
        dispatch(hideloading())
        toast.error('something went wrong')
    }   
}
useEffect(()=>{
getOrders()
},[])

  return (
    <div>
        <Navbaradmin/>
        
        <div className='w-full text-center 3xl font-bold'>ORDERS</div>

      
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                  Guide
                </th>
                <th scope="col" class="px-6 py-3">
                    Guest
                </th>
                <th scope="col" class="px-6 py-3">
                    location
                </th>
                <th scope="col" class="px-6 py-3">
                    Amount
                </th>
                <th scope="col" class="px-6 py-3">
                    advance
                </th>
                <th scope="col" class="px-6 py-3">
                    guest no
                </th>
                <th scope="col" class="px-6 py-3">
                    Payment
                </th>
                <th scope="col" class="px-6 py-3">
                    Date of Book
                </th>
            </tr>
        </thead>
        <tbody>
            {order.map((item)=>(
                 <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4">
                {item.guide}
                 </td> <td class="px-6 py-4">
                     {item.guest}
                 </td>
                 <td class="px-6 py-4">
                     {item.location}
                 </td>
                 <td class="px-6 py-4">
                     {item.amount}
                 </td>
                 <td class="px-6 py-4">
                     {item.advance}
                 </td>
                 <td class="px-6 py-4">
                     {item.numberofguest}
                 </td>
                 <td class="px-6 py-4">
                     {item.paymentstatus}
                 </td>
                 <td class="px-6 py-4">
                     {format(new Date(item.dateofbook),'dd-MM-yyyy')}
                 </td>
             </tr>

            ))}
           
           
            
        </tbody>
    </table>
</div>
<Adminfooter/>
    </div>
  )
}
