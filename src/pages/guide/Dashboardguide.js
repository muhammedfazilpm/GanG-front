import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import ReactApexChart from'react-apexcharts'
import { useDispatch } from 'react-redux'
import { hideloading, showloading } from '../../redux/alertSlice'
import Guidefooter from './Guidefooter'

export default function Dashboardguide() {
const dispatch=useDispatch()
 
 
    const [orders,setOrders]=useState([])
    const [totalamount,setTotal]=useState(null)
    const [completed,setCompleted]=useState(null)
    const [ordercount,setOrdercount]=useState(null)
    const [chartData, setChartData] = useState({ categories: [], series: [] });

    const getOrderdetails=async()=>{
        try {
          dispatch(showloading())
            const response = await axios.post(
                "http://localhost:5000/api/guide/getorders",
                {},
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              if(response.data.success){
                dispatch(hideloading())
                setOrdercount(response.data.ordercount)
                setCompleted(response.data.completed)
                setTotal(response.data.totalamount)
                setOrders(response.data.orders)
              }
            
        } catch (error) {
          dispatch(hideloading())
            
        }
    }
    useEffect(()=>{
getOrderdetails()
    },[])
    useEffect(() => {
      const groupData = {};
      orders.forEach((item) => {
        const date = item.dateofbook.split('T')[0];
        if (!groupData[date]) {
          groupData[date] = { count: 0, totalamount: 0 };
        }
        groupData[date].count++;
        groupData[date].totalamount += item.amount;
      });
      const categories = Object.keys(groupData);
      const series = categories.map((date) => groupData[date].totalamount);
      setChartData({ categories, series });
    }, [orders]);
    const options = {
      chart: {
        type: 'bar',
        height: 350,
      },
      xaxis: {
        categories: chartData.categories,
      },
    };
    
console.log("orders",orders)
  return (
    <div>
        <Navbar/>
        <div className="bg-gray-100 text-center">
            Dashboard
            <div className="container mx-auto px-4 py-8">
           
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Card 1 */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                    
                        <div className="h-40 w-full bg-blue-500 rounded-md">
                        <h2 className="font-bold text-xl text-white">TOTAL ORDER</h2>
                          <p className='font-bold text-white' >{ordercount}</p>
                        </div>
                        <h2 className="text-xl font-semibold mt-2">Order details</h2>
                        {/* <p className="text-gray-500">Some content here...</p> */}
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="h-40 w-full bg-blue-500 rounded-md">
                        <h2 className="font-bold text-xl text-white">ORDER COMPLETED</h2>
                          <p className='font-bold text-white' >{completed}</p>

                        </div>
                        <h2 className="text-xl font-semibold mt-2">Order details</h2>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="h-40 w-full bg-blue-500 rounded-md">
                        <h2 className="font-bold text-xl text-white">TOTAL AMOUNT</h2>
                          <p className='font-bold text-white' >{totalamount}</p>
                        </div>
                        <h2 className="text-xl font-semibold mt-2">Amount details</h2>
                    </div>
                </div>

                {/* Chart Div */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-4">
                <ReactApexChart options={options} series={[{ data: chartData.series }]} type="area" height={350} />
                    {/* You can add your chart here */}
                    <div id="chart" className="h-60"></div>
                </div>
            </div>
        </div>
      <Guidefooter/>
    </div>
  )
}
