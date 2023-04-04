import React, { useEffect, useState } from "react";
import { baseURL, setHeaders } from "../../../store/api";
import axios from "axios";
import moment from "moment";

export default function Transacions() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState([]);


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(
          `${baseURL}/orders/?new=true`,
          setHeaders()
        );

        setOrders(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return <div className="styled-transactions">
    {
        loading ? (
          <div className='image-preview border rounded shadow gap-5 d-flex justify-content-center align-items-center'>
          <div className='spinner-border text-primary m-auto align-self-center' role='status'>
            <span className='sr-only'>Loading...</span>
            </div>

        </div>
          ) : (
        <div className="transactions bg-dark text-white px-3 py-3 rounded">
            <h3>Lataest Transactions</h3>
            <table className="table table-striped  table-dark mt-3">
               <tbody>
               {orders?.map((order, idx)=> (
                    
                    <tr key={idx} className="text-white my-5  rounded">
                        <td  className="my-table-row   ">{order.shipping.name}</td>
                        <td className="my-table-row   "> {(order.total / 100).toLocaleString()}</td>
                        <td className="my-table-row   ">{moment(order.createdAt).fromNow()}</td>
                    </tr>
                
            ))}
               </tbody>
            </table>
            </div>
            )
    }
  </div>;
}
