import React from 'react'
import {Form,Input,Button} from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import './Resetpass.css'

export default function Resetpass() {
  const navigate=useNavigate()
  const onFinish=async(values)=>{
    
    try {
     
      const response=await axios.post('/api/guide/resetotp',values)
      
      if(response.data.success){
         toast.success(response.data.message)
         navigate("/login")
      }

      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("something went wrong")
    }
  }
  return (
    <>
    <div className='resetheader'>
    <h3>ENTER YOUR OTP HERE</h3>
    </div>
    <div className='resetcards'>
      
      <div className='resetform'>
      
    <Form layout='vertical' onFinish={onFinish}>
        <p>enter your otp and new password</p>
      <Form.Item  name="otp">
        <Input  type='number' placeholder='enter your otp here'/>     
      </Form.Item>
      <Form.Item  name="password1">
        <Input  type='text' placeholder='enter the password here'/>     
      </Form.Item>
      <Form.Item  name="password2">
        <Input  type='text' placeholder='confirm the password'/>     
      </Form.Item>
      
      <Form.Item>
      <Button htmlType='submit'>CLICK</Button>
      </Form.Item>
    </Form>
    <a href='/login'>Login</a>
    </div>
    </div>
    
    </>
  )
}
