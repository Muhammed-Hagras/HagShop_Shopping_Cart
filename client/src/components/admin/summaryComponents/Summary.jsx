import React, { useEffect, useState } from 'react'
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "../Widget";
import { baseURL, setHeaders } from '../../../store/api'
import axios from "axios"
import Chart from './Chart';
import Transacions from './Transacions';
import AllTimeData from './AllTimeData';


export default function Summary() {

  const [users, setUsers] = useState([]);
  const [userPerc, setUserPerc] = useState([]);

  const [orders, setOrders] = useState([]);
  const [ordersPerc, setOrdersPerc] = useState([]);

  const [ordersIncome, setOrdersIncome] = useState([]);
  const [ordersIncomePerc, setOrdersIncomePerc] = useState([]);


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
      try {
        const res = await axios.get(`${baseURL}/users/stats`, setHeaders());
        res.data.sort(compare);
        setUsers(res.data);
        setUserPerc((res.data[0].total - res.data[1].total)/ res.data[1].total*100);
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()

  },[])

  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${baseURL}/orders/stats`, setHeaders());
        res.data.sort(compare);
        setOrders(res.data);
        setOrdersPerc((res.data[0].total - res.data[1].total)/ res.data[1].total*100);
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()

  },[])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${baseURL}/orders/income/stats`, setHeaders());
        res.data.sort(compare);
        setOrdersIncome(res.data);
        setOrdersIncomePerc((res.data[0].total - res.data[1].total)/ res.data[1].total*100);
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()

  },[])



  const data = [
    {
      icon: <FaUsers />,
      digits: users[0]?.total,
      isMoney: false,
      title: "Users",
      color: "rgb(102, 108, 255)",
      bgColor: "rgba(102, 108, 255, 0.12)",
      percentage: userPerc,
    },
    {
      icon: <FaClipboard/>,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Orders",
      color: "rgb(38, 198, 249)",
      bgColor: "rgba(38, 198, 249, 0.12)",
      percentage: ordersPerc,
    },
    {
      icon: <FaChartBar />,
      digits: ordersIncome[0]?.total ? ordersIncome[0]?.total/100 : "",
      isMoney: true,
      title: "Earnings",
      color: "rgb(253, 181, 40)",
      bgColor: "rgba(253, 181, 40, 0.12)",
      percentage: ordersIncomePerc,
    },
  ];
  return (
    <div className="summary d-flex ms-3 gap-5">
      <div className="main-stats  flex-2">
        <div className=" overview bg-dark rounded text-white py-3 px-5 shadow">
          <div className="title">
            <h2>Overview</h2>
            <p>How your shop is performing compared to previous month.</p>
          </div>
          <div className="widget-wrapper d-flex justify-content-between w-100 gap-5 mt-5 mb-3" >
            {data?.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </div>
        </div>
        <Chart/>
      </div>
      
      <div className="side-stats flex-1 d-flex flex-column gap-5">
        <Transacions/>
        <AllTimeData data={data}/>
      </div>
    </div>
  );
}
