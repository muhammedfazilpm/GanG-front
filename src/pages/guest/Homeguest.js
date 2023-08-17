import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "antd";
import Navbarguest from "./Navbarguest";
import image1 from "./assets/pexels-william-fortunato-6140458.jpg";
import image2 from "./assets/homeimage2.jpg";
import image3 from "./assets/home3.jpg";
import Footerguest from "./Footerguest";

export default function Homeguest() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/guest/getUser",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("guesttoken"),
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbarguest />

      <div className="bg-gray-100 min-h-screen p-4">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Welcome to Our GAnG
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src={image1} alt="Image 1" className="mb-4" />
            <p className="text-gray-700">
              Welcome to Gang, your trusted companion for connecting with
              passionate and knowledgeable tourist guides who bring destinations
              to life.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src={image2} alt="Image 2" className="mb-4" />
            <p className="text-gray-700">
              {" "}
              Discover the heart and soul of every place you visit as our
              platform helps you find the ideal guide to enhance your journey.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src={image3} alt="Image 3" className="mb-4" />
            <p className="text-gray-700">
              Whether you're a history enthusiast, an adventure seeker, or
              simply looking for an authentic local perspective,
            </p>
          </div>
        </div>
      </div>
      <Footerguest/>
    </div>
  );
}
