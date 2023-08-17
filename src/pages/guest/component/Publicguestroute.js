import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Publicguestroute(props) {
    
  if(localStorage.getItem('guesttoken')){
    return <Navigate to='/guest'/>
  }
  else {
    
    return props.children
  }
}
