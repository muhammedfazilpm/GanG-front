import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";
// import './Otp.css'

export default function Forgetguest() {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showloading())
      const response = await axios.post("http://globalone.shop/api/guest/reset", values);

      if (response.data.success) {
        dispatch(hideloading())
        toast.success(response.data.message);
        navigate("/guestreset");
      } else {
        dispatch(hideloading())
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading())
      toast.error("something went wrong");
    }
  };
  return (
    <div className="headers">
      <h3>RESET PASSWORD</h3>

      <div className="card2">
        <div className="forms">
          <Form className="otpform" layout="vertical" onFinish={onFinish}>
            <h3>ENTER YOUR MAIL HERE</h3>

            <Form.Item className="inputs" name="email">
              <Input type="text" placeholder="enter your email here" />
            </Form.Item>

            <Form.Item>
              <Button className="button2" htmlType="submit">
                CLICK
              </Button>
            </Form.Item>
            <a href="/guest/register">register</a>
          </Form>
        </div>
      </div>
    </div>
  );
}
