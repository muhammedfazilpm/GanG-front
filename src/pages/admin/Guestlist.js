import React from 'react'
import Navbaradmin from './Navbaradmin'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { hideloading, showloading } from '../../redux/alertSlice'
import Swal from 'sweetalert2'



export default function Guestlist() {
  const dispatch=useDispatch()
      const [guest,guestSet]=useState([])
      const getGuest=async()=>{
        try {
          dispatch(showloading())
            const response= await axios.get('http://localhost:5000/api/admin/getGuest')
           dispatch(hideloading())
            if(response.data.success){
                
                guestSet(response.data.data)
            }
        } catch (error) {
          dispatch(hideloading())
            console.log(error)
        }
        }

        const blockGuest=async(id)=>{
          const result = await Swal.fire({
            title: 'Block Confirmation',
            text: 'Are you sure you want to Blcok this guest?',
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
               const response=await axios.post('http://localhost:5000/api/admin/blockGuest',{id})
              dispatch(hideloading())
               if(response.data.success){
               window.location.reload();
                 
               }
             } catch (error) {
               dispatch(hideloading())
               
             }

          }
          
        }

      
      useEffect(()=>{
        getGuest()
      },[])
      useEffect(()=>{
  console.log("gueststate",guest)
      },[guest])

  return (
    <div>
      <Navbaradmin/>
      <div style={{ overflowX: 'auto',textAlign:'center' }}>
        <h3>GUEST LISTS</h3>
      <table style={{ overflowX: 'auto',height:'100%' }} className="w-full border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">NAME</th>
            <th className="border px-4 py-2">PHONE</th>
            <th className="border px-4 py-2">EMAIL</th>
            <th className="border px-4 py-2">STATUS</th>
            <th className="border px-4 py-2">BLOCK</th>
          </tr>
        </thead>
        
        <tbody>
        {guest.map((item)=>(
            <tr>
            <td className="border px-4 py-2 text-center">{item.name}</td>
            <td className="border px-4 py-2 text-center">{item.phone}</td>
            <td className="border px-4 py-2 text-center">{item.email}</td>
            <td className="border px-4 py-2 text-center">{item.isVerfied?'verified':'Notverified'}</td>
            <td onClick={()=>{blockGuest(item._id)}} className="border px-4 py-2 text-center">{item.isBlocked?<button style={{background:"green"}} class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
  Unblock
</button>:<button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
  Block
</button>

}</td>

          </tr>

        ))}
          
          
        </tbody>
      </table>
    </div>
    </div>
  )
  }
