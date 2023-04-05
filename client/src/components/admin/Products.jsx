import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const goToCreateProducts = () => {
    navigate("/admin/products/create-products");
  };
  return (
    <div>
      <div className="product-header d-flex justify-content-between">
        <h2 className="product-title">Products</h2>
        <button onClick={goToCreateProducts} className="mb-5 btn btn-dark">
          Create Product
        </button>
        {/* <h2>Create Product</h2> */}
      </div>
      <Outlet />
    </div>
  );
}
