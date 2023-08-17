import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
// import './Otp.css'

export default function Otpguest() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/guest/otp", values);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/guest/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const otpRule = [
    { required: true, message: "Fill the otp field" },
    { min: 4, max: 4, message: "enter the four digit otp" },
  ];
  return (
    <div className="resetheader">
      <h3>ENTER YOUR OTP HERE</h3>

      <div className="resetcards">
        <div className="resetform">
          <Form layout="vertical" onFinish={onFinish}>
            <p>Enter your email otp here</p>
            <Form.Item rules={otpRule} name="otp">
              <Input type="number" placeholder="enter your otp here" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">CLICK</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
