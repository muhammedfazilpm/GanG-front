import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast  from 'react-hot-toast'

const Bookingform = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState([]);
  const [dateError, setDateError] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    numberOfPersons: "",
  });

  const getLocation = async () => {
    try {
      const response = await axios.post("/api/guest/getlocation");
      if (response) {
         
        setLocation(response.data.data);
        
      } else {
        console.log('err');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("locations", location);
    
  }, [location]);
  useEffect(() => {
    getLocation();
    
  }, []);
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
   

  };

  const handleSubmit = async (event) => {
    localStorage.setItem("formData", JSON.stringify(formData));
    event.preventDefault();
    navigate("/guest/guidelist", { state: formData });
  };

  return (
    <div
      style={{ display: "flex", height: "85vh", marginTop: "0",background:'wheat'}}
      className="p-8"
    >
      <div
        style={{
          width: "50%",
          background: "gray",
          textAlign: "center",
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingTop: "10%",
          marginTop: "0",
          height: "85vh",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="location">
              Location
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select location</option>

              {location.map((item) => (
                <option key={item.id} value={item.value}>
                  {item}
                </option>
              ))}

             
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="date">
              Date
            </label>
            <input
  type="date"
  id="date"
  name="date"
  value={formData.date}
  onChange={handleInputChange}
  min={new Date().toISOString().split('T')[0]}
  className="w-full p-2 border border-gray-300 rounded"
  required
/>

          

          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="numberOfPersons">
              Number of Persons
            </label>
            <input
              type="number"
              id="numberOfPersons"
              name="numberOfPersons"
              value={formData.numberOfPersons}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <button
              style={{ background: "black" }}
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bookingform;
