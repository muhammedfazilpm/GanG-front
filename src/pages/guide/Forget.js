import React from 'react'
import {Form,Input,Button} from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
// import './Otp.css'
import './Forget.css'

export default function Forget() {
  const navigate=useNavigate()
  const onFinish=async(values)=>{
    
    try {
     
      const response=await axios.post('/api/guide/reset',values)
      
      if(response.data.success){
         toast.success(response.data.message)
         navigate("/resetpass")
      }

      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("something went wrong")
    }
  }
  const emailRules=[{required:true,message:'Fill the Email field'},
{type:'email',message:"Enter the email in correct format"}]
  return (
    <>
    <div className='headers'>
    <h3>RESET PASSWORD</h3>
    </div>
    
    <div className='card2'>
      
      <div className='forms'>
      
    <Form className='otpform' layout='vertical' onFinish={onFinish}>
    <h3>ENTER YOUR MAIL HERE</h3>

      <Form.Item rules={emailRules} className='inputs' name="email">
        <Input  type='text' placeholder='ENTER YOUR EMAIL HERE'/>     
      </Form.Item>
      
      
      <Form.Item>
      <Button className='button2' htmlType='submit'>CLICK</Button>
      </Form.Item>
      <a href='/register'>Register</a>
    </Form>
    </div>
    
   
    </div>
    </>
  )
}
