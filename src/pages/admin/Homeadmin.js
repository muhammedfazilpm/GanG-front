import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Navbaradmin from "./Navbaradmin";

export default function Homeadmin() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/admin/getAdmin",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admintoken"),
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbaradmin />

      <p className="text-center mt-4">Home</p>
    </>
  );
}
