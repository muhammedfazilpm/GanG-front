import React from 'react'
import {Form,Input,Button} from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import './Otp.css'
import { useDispatch } from 'react-redux'
import { hideloading, showloading } from '../../redux/alertSlice'

export default function Otp() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const onFinish=async(values)=>{
    
    try {
      dispatch(showloading())
     
      const response=await axios.post('https://globalone.shop/api/guide/otp',values)
      
      if(response.data.success){
        dispatch(hideloading())
         toast.success(response.data.message)
         navigate("/login")
      }

      else{
        dispatch(hideloading())
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideloading())
      toast.error("something went wrong")
    }
  }

  const otpRules=[{required:true,message:'Fill the otp field'},
{min:4,max:4,message:'Enter the four digit otp'}]
  return (
    <div className='resetheader'>
    <h3>ENTER YOUR OTP HERE</h3>
    
    <div className='resetcards'>
      
      <div className='resetform'>
      
    <Form layout='vertical' onFinish={onFinish}>
    <p>Enter your otp here</p>
      <Form.Item rules={otpRules}  name="otp">
        <Input  type='number' placeholder='Enter your otp here'/>     
      </Form.Item>
      <Form.Item>
      <Button htmlType='submit'>CLICK</Button>
      </Form.Item>
    </Form>
    </div>
    </div>
    </div>
  )
}
