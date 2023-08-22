import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/reset.css";
import { Toaster } from "react-hot-toast";
import "./App.css";
import GuideContext from "./pages/context";
import { useState } from "react";
import axios from "axios";
import io from 'socket.io-client';


import Guesthome from "./pages/guesthome/Guesthome";

// GUIDE PAGE
// login side
import Login from "./pages/guide/Login";
import Home from "./pages/guide/Home";
import Otp from "./pages/guide/Otp";
import Protectedroute from "./pages/guide/components/Protectedroute";
import Publicroute from "./pages/guide/components/Publicroute";
import Register from "./pages/guide/Register";
import Forget from "./pages/guide/Forget";
import Resetpass from "./pages/guide/Resetpass";

// guide after login
import Profile from "./pages/guide/Profile";
import Adddetails from "./pages/guide/Adddetails";
import Editprofile from "./pages/guide/Editprofile";
import Orderguide from "./pages/guide/Orderguide";

//guest pages
import Registerguest from "./pages/guest/Registerguest";
import Otpguest from "./pages/guest/Otpguest";
import Loginguest from "./pages/guest/Loginguest";
import Homeguest from "./pages/guest/Homeguest";
import Protectedguestroute from "./pages/guest/component/Protectedguestroute";
import Publicguestroute from "./pages/guest/component/Publicguestroute";
import Forgetguest from "./pages/guest/Forgetguest";
import Resetguest from "./pages/guest/Resetguest";

// guest after login
import Bookingguest from "./pages/guest/Bookingguest";
import Listguideinguest from "./pages/guest/Listguideinguest";
import Guideviewguest from "./pages/guest/Guideviewguest";
import Ordersguest from "./pages/guest/Ordersguest";

// admin pages
import Loginadmin from "./pages/admin/Loginamin";
import Homeadmin from "./pages/admin/Homeadmin";
import Protectedadminroute from "./pages/admin/components/Protectedadminroute";
import Publicadminroute from "./pages/admin/components/Publicadminroute";
import Orders from "./pages/admin/Orders";

// after admin login
import Location from "./pages/admin/Location";
import Addlocation from "./pages/admin/Addlocation";
import Editlocation from "./pages/admin/Editlocation";
import Guidelist from "./pages/admin/Guidelist";
import Viewadminguide from "./pages/admin/Viewadminguide";
import Guestlist from "./pages/admin/Guestlist";
import Banners from "./pages/admin/Banners";
import Guidebanner from "./pages/admin/Guidebanner";
import Editguidebanner from "./pages/admin/Editguidebanner";
import Guestbanner from "./pages/admin/Guestbanner";

// import Chating from "./pages/Chating";
const socket=io.connect("http://localhost:5000")
console.log(socket)

function App() {
  const [guide, setGuide] = useState([]);
  const guidedata = {
    guide,
  };
  const getGuide = async () => {
    try {
      const response = await axios.get("/api/admin/getGuide");
      setGuide(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    console.log("guide state", guide);
  }, [guide]);

  useEffect(() => {
    getGuide();
  }, []);
 

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Guesthome />} />
        {/* guided routes */}
        <Route
          path="/login"
          element={
            <Publicroute>
              <Login />
            </Publicroute>
          }
        />
        <Route
          path="/register"
          element={
            <Publicroute>
              <Register />
            </Publicroute>
          }
        />
        <Route
          path="/home"
          element={
            <Protectedroute>
              <Home />
            </Protectedroute>
          }
        />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/resetpass" element={<Resetpass />} />
        {/* after login */}
        <Route
          path="/profile"
          element={
            <Protectedroute>
              <Profile />
            </Protectedroute>
          }
        />
        <Route
          path="/adDetails"
          element={
            <Protectedroute>
              <Adddetails />
            </Protectedroute>
          }
        />
        <Route
          path="/editprofile"
          element={
            <Protectedroute>
              <Editprofile />
            </Protectedroute>
          }
        />
        <Route
          path="/orders"
          element={
            <Protectedroute>
              <Orderguide />
            </Protectedroute>
          }
        />

        {/* guest routes */}
        <Route
          path="guest/register"
          element={
            <Publicguestroute>
              <Registerguest />
            </Publicguestroute>
          }
        />
        <Route path="/guest/otp" element={<Otpguest />} />
        <Route
          path="/guest/login"
          element={
            <Publicguestroute>
              <Loginguest />
            </Publicguestroute>
          }
        />
        <Route
          path="/guest"
          element={
            <Protectedguestroute>
              <Homeguest />
            </Protectedguestroute>
          }
        />
        <Route path="/forgetPassword" element={<Forgetguest />} />
        <Route path="/guestreset" element={<Resetguest />} />
        {/* after guest login */}
        <Route
          path="/guest/book"
          element={
            <Protectedguestroute>
              <Bookingguest />
            </Protectedguestroute>
          }
        />
        <Route
          path="/guest/guidelist"
          element={
            <GuideContext.Provider value={guidedata}>
              <Listguideinguest />
            </GuideContext.Provider>
          }
        />
        <Route path="/guest/guideView" element={<Guideviewguest />} />
        <Route
          path="guest/orders"
          element={
            <Protectedguestroute>
              <Ordersguest/>
            </Protectedguestroute>
          }
        />

        {/* admin routes */}
        <Route
          path="/admin/login"
          element={
            <Publicadminroute>
              <Loginadmin />
            </Publicadminroute>
          }
        />
        <Route
          path="/admin"
          element={
            <Protectedadminroute>
              <Homeadmin />
            </Protectedadminroute>
          }
        />

        {/* admin root after login*/}
        <Route
          path="/admin/location"
          element={
            <Protectedadminroute>
              <Location />
            </Protectedadminroute>
          }
        />
        <Route
          path="/admin/addlocation"
          element={
            <Protectedadminroute>
              <Addlocation />
            </Protectedadminroute>
          }
        />
        <Route
          path="/admin/editlocation"
          element={
            <Protectedadminroute>
              <Editlocation />
            </Protectedadminroute>
          }
        />
        <Route
          path="/admin/guide"
          element={
            <GuideContext.Provider value={guidedata}>
              <Guidelist />
            </GuideContext.Provider>
          }
        />
        <Route
          path="/admin/viewguide"
          element={
            <Protectedadminroute>
              <Viewadminguide />
            </Protectedadminroute>
          }
        />
        <Route
          path="/admin/guest"
          element={
            <Protectedadminroute>
              <Guestlist />
            </Protectedadminroute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <Protectedadminroute>
              <Orders/>
            </Protectedadminroute>
          }
        />
        <Route
          path="/admin/banners"
          element={
            <Protectedadminroute>
              <Banners/>
            </Protectedadminroute>
          }
        />
         <Route
          path="/admin/addguidebanner"
          element={
            <Protectedadminroute>
              <Guidebanner />

            </Protectedadminroute>
          }
        />
        
        <Route
          path="/admin/editGuidebanner"
          element={
            <Protectedadminroute>
              <Editguidebanner/>
            </Protectedadminroute>
          }
        />
        <Route
          path="/admin/Guestbanner"
          element={
            <Protectedadminroute>
              <Guestbanner/>
            </Protectedadminroute>
          }
        />
      </Routes>
      
      
     
    </BrowserRouter>
    
  );
}

export default App;
