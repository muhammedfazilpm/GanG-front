import React from "react";
import "antd/dist/reset.css";
import { Button, Form } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";

export default function Loginadmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showloading());
      const response = await axios.post("http://globalone.shop/api/admin/login", values);
      dispatch(hideloading());

      if (response.data.success) {
        toast.success(response.data.message);

        localStorage.setItem("admintoken", response.data.data);

        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      toast.error("Something went wrong");
    }
  };

  const emailRules = [
    { required: true, message: "Please fill the email field" },
    { type: "email", message: "Please enter a valid email" },
  ];

  const PasswordRules = [
    { required: true, message: "Please fill the password field" },
    { min: 6, message: "Password must be at least 6 characters long" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
    <div className="bg-blue-500 rounded-lg shadow-lg p-8 max-w-md w-full">
      <h1 className="text-4xl text-center  font-semibold text-white mb-6">
        GANG
      </h1>
      <h2 className="text-2xl text-center text-white mb-8">
        Guest And Guide
      </h2>
  
      <div className="authentications-form text-white">
        <div className="p-4 rounded-lg text-white bg-blue-700">
          <h3 className="text-2xl text-center font-semibold text-white mb-4">
            ADMIN LOGIN
          </h3>
  
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item rules={emailRules} name="email">
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                type="email"
                placeholder="Enter your email"
              />
            </Form.Item>
  
            <Form.Item rules={PasswordRules} name="password">
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                type="password"
                placeholder="Enter your password"
              />
            </Form.Item>
  
            <Button
              className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring focus:border-red-400"
              htmlType="submit"
              type="primary"
            >
              LOGIN
            </Button>
          </Form>
  
          {/* <div className="atags">
            <a href='/forgetPassword'>Forgot password</a>
          </div> */}
        </div>
      </div>
    </div>
  </div>
  
  
  );
}
