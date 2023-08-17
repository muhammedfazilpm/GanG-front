import React from 'react'
import './Register.css'
import 'antd/dist/reset.css';
import { Button,Form,Input} from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const navigate=useNavigate()
  const onFinish= async(values)=>{
   try {
   console.log(values)
    const response=await axios.post("/api/guide/register",values)
    if(response.data.success){
        toast.success(response.data.message)
            navigate("/otp")
    }
    else{
      
toast.error(response.data.message)
    }
    
   } catch (error) {
    console.log(error);
    
toast.error("some thing went wrong")
   }
  }
   // Frontend form validation rules
   const nameRules = [{ required: true, message: 'Please enter your name' }];
   const emailRules = [
     { required: true, message: 'Please enter your email' },
     { type: 'email', message: 'Please enter a valid email address' },
   ];
   const phoneRules = [
     { required: true, message: 'Please enter your phone number' },
     {min:10,max:10 ,message: 'Phone must be  10 characters long'  }
     // Add additional phone number validation rules as needed
   ];
   const passwordRules = [
     { required: true, message: 'Please enter your password' },
     { min: 6, message: 'Password must be at least 6 characters long' },
   ];

  return (
    <div className='header'>
    <h3 >GANG</h3>
    <h5>Guest ANd Guide</h5>
    <div className='authentication'>
    
      <div className='authentication-form card '>
        <h3>GUIDE <br/>REGISTERATION</h3>
    
     
<Form layout='vertical' onFinish={onFinish}>
  <Form.Item rules={nameRules}  name="name">
    <Input type='text' placeholder='enter your Name'/>   
    </Form.Item>
    <Form.Item rules={emailRules} name="email">
    <Input placeholder='enter your mail' />
    </Form.Item>
   <Form.Item rules={phoneRules} name='phone'>
   <Input type='number' placeholder='enter your phone ' />
   </Form.Item>
    <Form.Item rules={passwordRules} name='password'>
    <Input placeholder='enter your password' type='password' />
    </Form.Item>
    <div style={{width:'100%',display:'flex !important',justifyContent:'center',background:'red'}} >
     <Form.Item >
    <Button htmlType='submit'  className='button' type="primary">REGISTER</Button>
    </Form.Item>
    </div>
    </Form>
    <a href='/login'>click here for login</a>
   
   
    
      </div>
    </div>
    </div>
  )
}
