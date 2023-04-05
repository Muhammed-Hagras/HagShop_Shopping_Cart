import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL, setHeaders } from "../../store/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice"

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(
          `${baseURL}/products/find/${id}`,
          setHeaders()
        );

        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
    fetchData();
  }, [id]);

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  }

  return (
    <div className="product-details p-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-100 rounded shadow p-5 d-flex justify-content-center gap-5 align-items-center w-50 my-5 mx-auto">
          <div className="w-100 h-100  ">
            <img src={product?.image?.url} className="w-100 h-100" alt="" />
          </div>
          <div>
            <div className="h-100  fs-5">
              <h1 className="text-left">{product.name}</h1>
              <div className="text-box">
                <p className="text-left">
                  <span className="text-dark me-2">Brand : </span>{" "}
                  {product.brand}
                </p>
                <p className="text-left">
                  <span className="text-dark me-2">Description : </span>
                  {product.desc}
                </p>
              </div>
            </div>
            <div className=" h-100 ">
              <p className="text-left h2">{product.price} $</p>
            </div>
            <button className="btn btn-info mt-3 px-4 py-3 fs-4 fw-bold text-light"
            onClick={() => addToCartHandler(product)}
            >Add To Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}
