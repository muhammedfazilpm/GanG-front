import React from "react";
import "antd/dist/reset.css";
import { Button, Form } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Loginguest.css";

export default function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/guest/login", values);
      if (response.data.success) {
        toast.success(response.data.message);

        localStorage.setItem("guesttoken", response.data.data);

        navigate("/guest");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("some thing went wrong");
    }
  };
  const emailRules = [
    { required: true, message: "Please fill the email field" },
    { type: "email", message: "Please enter a valid email" },
  ];

  const PasswordRules = [
    { required: true, message: "Please fill the password field" },
    { min: 6, message: "Password must be min 6 character long" },
  ];
  return (
    <div className="guestbody">
      <div className="guestheader">
        <h3>GANG </h3>
        <h5> Guest ANd Guide</h5>
      </div>

      <div className="guestmiddle">
        <div className="guestcard">
          <h3>GUEST LOGIN</h3>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item rules={emailRules} name="email">
              <input type="email" placeholder="enter your mail" />
            </Form.Item>
            <Form.Item rules={PasswordRules} name="password">
              <input placeholder="enter your password" type="password" />
            </Form.Item>

            <Button htmlType="submit" className="button" type="primary">
              LOGIN
            </Button>
          </Form>
          <div className="guesttags">
            <a href="/guest/register">Register</a>
            <a href="/forgetPassword">forget password</a>
          </div>
        </div>
      </div>
    </div>
  );
}
