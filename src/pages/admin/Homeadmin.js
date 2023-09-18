import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbaradmin from "./Navbaradmin";
import ReactApexChart from 'react-apexcharts'
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";
import Adminfooter from "./Adminfooter";

export default function Homeadmin() {
  const dispatch=useDispatch()
  const [guidecount, setGuidecount] = useState(null);
  const [guestcount, setGuestcount] = useState(null);
  const [ordercount, setOrdercount] = useState(null);
  const [advavancetotal, setAdvance] = useState(null);
  const [firstplace, setFirstplace] = useState('');
  const [firstplacecount, setFirstplacecount] = useState(null);
  const [order, setOrder] = useState([]);
  const [chartData, setChartData] = useState({ categories: [], series: [] });

  const getData = async () => {
    try {
      dispatch(showloading())
      console.log("before request")
      const response = await axios.post(
        "http://localhost:5000/api/admin/getAdmin",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admintoken"),
          },
        }
      );
      dispatch(hideloading())
      if (response.data.success) {
        setGuidecount(response.data.guidecount);
        setGuestcount(response.data.guestcount);
        setOrdercount(response.data.ordercount);
        setAdvance(response.data.advavancetotal);
        setFirstplace(response.data.firstplace);
        setFirstplacecount(response.data.firstplacecount);
        setOrder(response.data.order);
      }
    } catch (error) {
      dispatch(hideloading())
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const groupData = {};
    order.forEach((item) => {
      const date = item.dateofbook.split('T')[0];
      if (!groupData[date]) {
        groupData[date] = { count: 0, totalamount: 0 };
      }
      groupData[date].count++;
      groupData[date].totalamount += item.advance;
    });
    const categories = Object.keys(groupData);
    const series = categories.map((date) => groupData[date].totalamount);
    setChartData({ categories, series });
  }, [order]);

  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: chartData.categories,
    },
  };

  return (
    <>
      <Navbaradmin />
      <div className="min-h-screen w-full bg-gray-100 flex flex-col">
        <header className="bg-white w-full text-center py-4 shadow-md">
          <h1>DASH BOARD</h1>
        </header>

        <main className="flex-grow w-full p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
        
        
        <div className="bg-white w-full  p-0 shadow-md rounded-md">
        <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
    <div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-indigo-50 shadow-md">
      <div>
        <h2 className="text-gray-900 text-lg font-bold">Total Guide</h2>
        {/* <h3 className="mt-2 text-xl font-bold text-yellow-500 text-left">+ 150.000 </h3> */}
        {/* <p className="text-sm font-semibold text-gray-400">Last Transaction</p> */}
        
      </div>
      <div className="bg-gradient-to-tr from-blue-500 to-blue-400 w-32 h-32 rounded-full shadow-2xl shadow-blue-400 border-white border-dashed border-2 flex justify-center items-center">
        <div>
          <h1 className="text-white text-2xl">{guidecount}</h1>
        </div>
      </div>
    </div>
  </div>
          <div>
            
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-0 shadow-md rounded-md">
        <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
    <div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-indigo-50 shadow-md">
      <div>
        <h2 className="text-gray-900 text-lg font-bold">Total Guest</h2>
        {/* <h3 className="mt-2 text-xl font-bold text-yellow-500 text-left">+ 150.000 </h3> */}
        {/* <p className="text-sm font-semibold text-gray-400">Last Transaction</p> */}
        
      </div>
      <div className="bg-gradient-to-tr from-blue-500 to-blue-400 w-32 h-32 rounded-full shadow-2xl shadow-blue-400 border-white border-dashed border-2 flex justify-center items-center">
        <div>
          <h1 className="text-white text-2xl">{guestcount}</h1>
        </div>
      </div>
    </div>
  </div>
        
        </div>

    
        <div className="bg-white p-0 shadow-md rounded-md">
        <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
    <div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-indigo-50 shadow-md">
      <div>
      
        <h2 className="text-gray-900 text-lg font-bold">Total Order</h2>
       
        
      </div>
      <div className="bg-gradient-to-tr from-blue-500 to-blue-400 w-32 h-32 rounded-full shadow-2xl shadow-blue-400 border-white border-dashed border-2 flex justify-center items-center">
        <div>
          <h1 className="text-white text-2xl">{ordercount}</h1>
        </div>
      </div>
    </div>
  </div>
        
        </div>

        
        <div className="bg-white p-0 shadow-md rounded-md">
        <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
    <div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-indigo-50 shadow-md">
      <div>
      
        <h2 className="text-gray-900 text-lg font-bold">Total Advance</h2>
       
        
      </div>
      <div className="bg-gradient-to-tr from-blue-500 to-blue-400 w-32 h-32 rounded-full shadow-2xl shadow-blue-400 border-white border-dashed border-2 flex justify-center items-center">
        <div>
          <h1 className="text-white text-2xl">{advavancetotal}</h1>
        </div>
      </div>
    </div>
  </div>
    
        </div>

        
        <div className="bg-white p-0 shadow-md rounded-md">
        <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
    <div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-indigo-50 shadow-md">
      <div>
        <h2 className="text-gray-900 text-lg font-bold">Most visited</h2>
        <h3 className="mt-2 text-xl font-bold text-yellow-500 text-left">{firstplace} </h3>
        
      </div>
      <div className="bg-gradient-to-tr from-blue-500 to-blue-400 w-32 h-32 rounded-full shadow-2xl shadow-blue-400 border-white border-dashed border-2 flex justify-center items-center">
        <div>
          <h1 className="text-white text-2xl"><p>no</p>{firstplacecount}</h1>
        </div>
      </div>
    </div>
  </div>
          {/* Card content */}
        </div>
      </div>

          
          {/* Chart */}
          <div className="bg-white p-6 shadow-md rounded-md">
          <ReactApexChart options={options} series={[{ data: chartData.series }]} type="area" height={350} />
          </div>
        </main>

        <footer className="bg-gray-200 py-4">
          {/* Footer content */}
        </footer>
      </div>
      <Adminfooter/>
    </>
  );
}
