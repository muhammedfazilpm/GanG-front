import React from "react";
import Navbarguest from "./Navbarguest";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

export default function Guideviewguest() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoBack = () => {
    navigate("/guest/guidelist");
  };
  const itmData = location.state.data;
  console.log("dddd", itmData);
  return (
    <div>
      <Navbarguest />
      <div style={{ height: "80vh" }}>
        <div
          style={{ display: "flex", height: "100%", justifyContent: "center" }}
        >
          <a
            href="#"
            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={itmData?.profile}
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <div>
                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Name : {itmData?.name}
                </h5>
                <h5 class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">
                  Location : {itmData?._doc.location}
                </h5>
              </div>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                advance {itmData?._doc.advance}
              </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                amount {itmData?._doc.amount}
              </p>

              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {itmData?._doc.description}
              </p>

              <button
                onClick={handleGoBack}
                style={{
                  background: "maroon",
                  padding: "0.2cm",
                  borderRadius: "0.2cm",
                  color: "wheat",
                }}
              >
                Go back
              </button>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
