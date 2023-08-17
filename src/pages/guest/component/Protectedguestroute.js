import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Protectedguestroute(props) {
  if(localStorage.getItem('guesttoken')){
    return props.children
  }
  else{
   return <Navigate to='/guest/login'/>
  }
  
}
