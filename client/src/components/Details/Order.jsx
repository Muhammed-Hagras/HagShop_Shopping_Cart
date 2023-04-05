import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL, setHeaders } from "../../store/api";
import axios from "axios";
import styled from "styled-components";

export default function Order() {
  const { id } = useParams();
  const [order, setorder] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(
          `${baseURL}/orders/find/${id}`,
          setHeaders()
        );
        setorder(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
    fetchData();
  }, [id]);
  return (
    <div className="order-details p-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-100 rounded text-left shadow p-5  w-50 my-5 mx-auto">
          <div className="order-container">
            <h2 className="mt-5">Order Details</h2>
            <div className="order-status d-flex gap-5">
              <span className="d-inline-block">
                {" "}
                Delivery Status :
                <span className="d-inline-block ms-3">
                  {order.delivery_status === "pending" ? (
                    <Pending className="text-warning p-2 rounded bg-light p-2">
                      Pending
                    </Pending>
                  ) : order.delivery_status === "dispatched" ? (
                    <Dispatched className="text-info p-2 rounded bg-light p-2">
                      Dispatched
                    </Dispatched>
                  ) : order.delivery_status === "delivered" ? (
                    <Delivered className="text-success p-2 rounded bg-light p-2">
                      Delivered
                    </Delivered>
                  ) : (
                    "error"
                  )}
                </span>
              </span>
            </div>
            <div className="order-product">
              <h3>Order Product</h3>
              <table className="table table">
                <tbody>
                  {order?.products?.map((product, idx) => (
                    <tr key={idx}>
                      <td>{product.description}</td>
                      <td>{product.quantity}</td>
                      <td>
                        {"$ " + (product.amount_total / 100).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="order-price">
              <h3 className="my-4">Totla Price</h3>
              <p className="h4 my-3">{"$ " + (order?.total / 100).toLocaleString()}</p>
            </div>
            <div className="shipping-details mt-3 mb-5">
              <h3 className="mb-3">Shipping Details</h3>
              <table className="table table">
                <tbody>
                    <tr >
                      <td>Customer : {order.shippping?.name}</td>
                      <td>City : {order.shippping?.address.city}</td>
                      <td>
                      Email : {order.shippping?.email}
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Pending = styled.div`
`;

const Dispatched = styled.div`
`;

const Delivered = styled.div`
`;

// {order?.products?.map((product, idx) => (
//   <tr key={idx}>
//     <td>{product.description}</td>
//     <td>{product.quantity}</td>
//     <td>{"$ " + (product.amount_total /100 ).toLocaleString()}</td>
//   </tr>
// ))}
