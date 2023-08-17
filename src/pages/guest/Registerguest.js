import React from "react";
import "./Registerguest.css";
import "antd/dist/reset.css";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Registerguest() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/guest/register", values);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/guest/otp");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("some thing went wrong");
    }
  };

  const nameRules = [{ required: true, message: "Please enter your name" }];
  const emailRules = [
    { required: true, message: "Please enter your email" },
    { type: "email", message: "Please enter a valid email address" },
  ];
  const phoneRules = [
    { required: true, message: "Please enter your phone number" },
    { min: 10, max: 10, message: "Enter the 10 digit mobile number" },
    // Add additional phone number validation rules as needed
  ];
  const passwordRules = [
    { required: true, message: "Please enter your password" },
    { min: 6, message: "Password must be at least 6 characters long" },
  ];

  return (
    <div className="guestheader2">
      <h3>GANG</h3>
      <h5>Guest ANd Guide</h5>
      <div className="guestauthentication">
        {/* <div className='guestsideimage'><h3>HERE IS YOUR WORLD</h3></div> */}
        <div className="authentication-form guestcard ">
          <h4 style={{ padding: "10px" }}>GUEST REGISTERATION</h4>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item rules={nameRules} name="name">
              <Input type="text" placeholder="enter your Name" />
            </Form.Item>
            <Form.Item rules={emailRules} name="email">
              <Input placeholder="enter your mail" />
            </Form.Item>
            <Form.Item rules={phoneRules} name="phone">
              <Input type="number" placeholder="enter your phone " />
            </Form.Item>
            <Form.Item rules={passwordRules} name="password">
              <Input placeholder="enter your password" type="password" />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                layout="vertical"
                className="button"
                type="primary"
              >
                REGISTER
              </Button>
            </Form.Item>
          </Form>

          <a href="/guest/login">click here for login</a>
        </div>
      </div>
    </div>
  );
}
