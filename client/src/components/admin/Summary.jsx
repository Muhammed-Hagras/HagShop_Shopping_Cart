import React from "react";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "./Widget";

export default function Summary() {
  const data = [
    {
      icon: <FaUsers />,
      digits: 50,
      isMoney: false,
      title: "Users",
      color: "rgb(102, 108, 255)",
      bgColor: "rgba(102, 108, 255, 0.12)",
      percentage: 30,
    },
    {
      icon: <FaClipboard/>,
      digits: 70,
      isMoney: false,
      title: "Orders",
      color: "rgb(38, 198, 249)",
      bgColor: "rgba(38, 198, 249, 0.12)",
      percentage: 20,
    },
    {
      icon: <FaChartBar />,
      digits: 50000,
      isMoney: true,
      title: "Earnings",
      color: "rgb(253, 181, 40)",
      bgColor: "rgba(253, 181, 40, 0.12)",
      percentage: 60,
    },
  ];
  return (
    <div className="summary d-flex ms-3">
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
      </div>
      <div className="sidebar-stats flex-1 d-flex"></div>
    </div>
  );
}

// bg-dark rounded text-white p-3 shadow

{
  /* <div className="icon">
{data.icon}
</div>
<div className="number">
{data.digits}
</div>
<div className="title">
{data.title}
</div>
<div className="color">
{data.color}
</div> */
}
