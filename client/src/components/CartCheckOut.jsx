import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function CartCheckOut({ _id,cartTotalAmount }) {
  const { _id} = useSelector(state => state.authReducer);
  useEffect(() => {
    console.log(_id)
  },[])
  return (
    <div className="cart-checkout shadow p-5  ">
      <div className="subtotal d-flex justify-content-between my-3">
        <span>Subtotal</span>
        <span>{cartTotalAmount}</span>
      </div>
      <p>Taxes and shipping calculated at checkout</p>
      {
        _id? (
          <button className="btn btn-info w-100 fs-5 mb-3">Check out</button>
        ) : (
          <NavLink to="/login" className="btn btn-warning">Login to Checkout</NavLink>
        )
      }
      <div className="continue-shopping">
        <NavLink
          to="/"
          className="text-decoration-none d-flex align-items-center text-muted"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          <span className="">Countinue Shopping</span>
        </NavLink>
      </div>
    </div>
  );
}
