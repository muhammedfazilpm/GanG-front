import React from "react";
import Navbarguest from "./Navbarguest";
import Bookingform from "./Bookingform";

export default function Bookingguest() {
  return (
    <div style={{height:'100vh'}}>
      <Navbarguest />
      <Bookingform />
    </div>
  );
}
