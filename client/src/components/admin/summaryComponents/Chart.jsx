import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { baseURL,setHeaders } from "../../../store/api";
import axios from "axios";

// const data = [
//   {
//     day: "Mon",
//     amount: 4000,
//   },
//   {
//     name: "Thu",
//     amount: 2000,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

export default function Chart() {
//   const demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState([]);

  function compare(a,b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }


  useEffect(() => {
    async function fetchData() {
        setLoading(true);
      try {
        const res = await axios.get(`${baseURL}/orders/week-sales`, setHeaders());
        res.data.sort(compare);
        const newData =  res?.data.map((item) => {
            const DAYS = [
                "Sat",
                "Sun",
                "Mon",
                "Tue",
                "Wen",
                "Thu",
                "Fri",
            ]

            return {
                day: DAYS[item._id - 1],
                amount: item.total / 100
            }
        })

        setSales(newData)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    fetchData()

  },[])

  return (
    
    <div className="styled-chart w-100 mt-5">
      {
        loading ? (
          <div className='image-preview border rounded shadow gap-5 d-flex justify-content-center align-items-center'>
            <div className='spinner-border text-primary m-auto' role='status'>
              <span className='sr-only'>Loading...</span>
              </div>
  
          </div>
        ) : (
          <>
          <h2 className="my-3">Latest 7 Day Earnings (US $)</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={sales}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              {/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
          </>
        )
      }
       
    </div>
  );
}
