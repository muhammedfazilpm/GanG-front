import React from "react";
import "antd/dist/reset.css";
import { Button, Form } from "antd";
import "./Loginamin.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Loginadmin() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/admin/login", values);
      if (response.data.success) {
        toast.success(response.data.message);

        localStorage.setItem("admintoken", response.data.data);

        navigate("/admin");
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
    <div className="header">
      <h3>GANG</h3>
      <h5>Guest ANd Guide</h5>
      <div className="adminauthentication">
        <div className="authentications-form card ">
          <h3>
            ADMIN <br />
            LOGIN
          </h3>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item rules={emailRules} name="email">
              <input
                style={{ width: "100%" }}
                type="email"
                placeholder="enter your mail"
              />
            </Form.Item>
            <Form.Item rules={PasswordRules} name="password">
              <input
                style={{ width: "100%" }}
                placeholder="enter your password"
                type="password"
              />
            </Form.Item>

            <Button
              style={{ marginTop: "100px", background: "red" }}
              htmlType="submit"
              className="button"
              type="primary"
            >
              LOGIN
            </Button>
          </Form>
          <div className="atags">
            {/* <a href='/forgetPassword'>forget password</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
