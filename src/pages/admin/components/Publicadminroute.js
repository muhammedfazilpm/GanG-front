import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Publicadminroute(props) {
    
  if(localStorage.getItem('admintoken')){
    return <Navigate to='/admin'/>
  }
  else {
    
    return props.children
  }
}
