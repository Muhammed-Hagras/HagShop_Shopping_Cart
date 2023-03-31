import React from "react";
import { useSelector } from "react-redux";
import { baseURL } from "../../store/api";
import axios from "axios";

export default function PayButton({ cartItems }) {
  const { _id } = useSelector((state) => state.authReducer);
  const checkOutHandler = () => {
    axios
    .post(`${baseURL}/stripe/create-checkout-session`, {  cartItems,
      userId: _id,
    })
    .then((res) => {
        console.log(res);
        if (res.data.url) {
        window.location.href = res.data.url;}
      })
    .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <button className="btn btn-info w-100 fs-5 mb-3"
      onClick={()=> checkOutHandler()}
      >Check out</button>
    </div>
  );
}
