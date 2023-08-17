import React from 'react'
import 'antd/dist/reset.css';
import { Button,Form } from 'antd';
import "./Login.css"
import axios from 'axios';      
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'

// import Password from 'antd/es/input/Password';

export default function Login() {
  const navigate=useNavigate();
  const onFinish=async(values)=>{
    
    try {
const response=await axios.post("/api/guide/login",values)
     if(response.data.success){
      toast.success(response.data.message)
    
      localStorage.setItem("token",response.data.data)
      
      navigate("/home")
      
     }
     else{
      toast.error(response.data.message)
     }
      
    } catch (error) {
      toast.error("some thing went wrong")
    }
  }
  const emailRules=[{required:true,message:'Please fill the email field'},
{type:'email',message:'Please enter a valid email'}]

const PasswordRules=[{required:true,message:'Please fill the password field'},
{min:6,message:'Password must be min 6 character long'}]
  return (
    <div className='Guideloginbody'>
     <div className='Guideloginheader'>
     <h3 >GANG</h3>
    <h5>Guest ANd Guide</h5>
     </div>
   
    <div className='Guidelogincardback'>
       
      <div className='Guidelogincard'>
        <div >
        <h3>GUIDE LOGIN</h3>
        </div>

        <Form  onFinish={onFinish}>
      <div style={{width:'100%'}} >
          <Form.Item rules={emailRules} name="email">
    <input type='email' placeholder='enter your mail'/>   
    </Form.Item>
   
    <Form.Item rules={PasswordRules} name="password">
    <input type="password" placeholder='enter your password'/>
    </Form.Item>
   
    </div>
    <Button htmlType='submit' className='button' type="primary">LOGIN</Button>
    </Form>
    <div className='Guidelogintags'>
    <a href='/register'>Register</a>
    <a href='/forget'>forget password</a>
    </div>  
      </div>
    </div>
    </div>  )
}
