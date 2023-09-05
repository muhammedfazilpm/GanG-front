import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";

const Bookingform = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [errors,setErrors]=useState({})
  const [location, setLocation] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    numberOfPersons: "",
  });


  const getLocation = async () => {
    try {
      dispatch(showloading())
      const response = await axios.post("/api/guest/getlocation");
      if (response) {
         dispatch(hideloading())
        setLocation(response.data.data);
        
      } else {
        dispatch(hideloading())

      }
    } catch (error) {
      dispatch(hideloading())
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
    event.preventDefault();
    const newErrors={}
  
  
      if(!formData.name){
        newErrors.name="Name is required"
      }
      if(!formData.location){
        newErrors.location="Location required"
      }
      if(!formData.date){
        newErrors.date="Please select a date"
      }
      if(!formData.numberOfPersons){
        newErrors.numberOfPersons="Enter the count"
      }
      if(Object.keys(newErrors).length>0){
        setErrors(newErrors)
      }
      else{
        localStorage.setItem("formData", JSON.stringify(formData));
      
      navigate("/guest/guidelist", { state: formData });
  
      }

    
   
    
  };

  return (
    <div
      style={{ display: "flex", minHeight: "85vh",maxHeight:'300px', marginTop: "0",background:'wheat'}}
      className="p-0"
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
          minHeight: "85vh",
          minWidth:'300px',
          maxHeight:'300px'
        
        }}
      >
        <form style={{maxHeight:'300px'}} onSubmit={handleSubmit} className="space-y-4">
          <div>
            {errors.name&&!formData.name&&<p className="text-white">{errors.name}</p>}
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
            />
          </div>
          <div>
            {errors.location&&!formData.location&&<p className="text-white">{errors.location}</p>}
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
            {errors.date&&!formData.date&&<p className="text-white">{errors.date}</p>}
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
  // required
/>

          

          </div>
          <div>
            {errors.numberOfPersons&&!formData.numberOfPersons&&<p className="text-white">{errors.numberOfPersons}</p>}
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
              // required
            />
          </div>
          <div>
            <button
              style={{ background: "maroon" }}
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
