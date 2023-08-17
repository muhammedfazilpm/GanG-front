import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Protectedadminroute(props) {
  if(localStorage.getItem('admintoken')){
    return props.children
  }
  else{
   return <Navigate to='/admin/login'/>
  }
  
}
