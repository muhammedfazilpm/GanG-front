import React from "react";
import "./Guesthome.css";
import { useNavigate } from "react-router-dom";

export default function Guesthome() {
  const navigate = useNavigate();
  const gotoGuest = () => {
    navigate("/guest/login");
  };
  const gotoguide = () => {
    navigate("/login");
  };

  return (
    <div className="guestpagebody">
      <div className="guestpageheader">
        <h1>GanG</h1>
        <p>A complete Guest ANd Guide solusion </p>
      </div>
      <div className="guestpagedetails">
        <div className="guestpageabout">
          <h1>ABOUT US</h1>
          <p>
            Welcome to Guest and Guide, your trusted companion on a journey of
            discovery! Our mission is to transform your travel experience into a
            memorable adventure. With a warm and hospitable approach, we treat
            you as more than just a tourist – you're our esteemed guest.{" "}
          </p>
        </div>
      </div>
      <div className="guestpagemiddle">
        <div onClick={gotoGuest} className="guestpagecard">
          <h1>Guest</h1>
          <p>
            Our expert guides are passionate about sharing their local
            knowledge, taking you beyond the ordinary tourist routes to uncover
            hidden gems and cultural treasures
          </p>
          <h1 style={{ color: "#F33A6A" }}>Click here for guest login </h1>
        </div>

        <div onClick={gotoguide} className="guestpagecard2">
          <h1>Guide</h1>
          <p>
            Are you a passionate explorer, eager to share your love for your
            city with curious travelers? Join Guest and Guide as a valued member
            of our guide community
          </p>
          <h1 style={{ color: "#F33A6A" }}>Click here for guide login </h1>
        </div>
      </div>
    </div>
  );
}
