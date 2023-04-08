import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { addToCart } from "./../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const dispatch = useDispatch()
  const { products, isLoading, error } = useSelector(
    (state) => state.productsReducres
  );

  const [filter, setFilter] = useState(products);

  useEffect(() =>{
    setFilter(products);
  },[products])

  const filteredProducts = (categ) => {
    const updatedList = products.filter((x) => x.brand === categ);
    setFilter(updatedList);
  };

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <>
      <div className="bg-light h-100 p-5 d-flex items-center text-center">
        <div className="container">
          <motion.h1 className="display-2 fw-bold text-dark"
          initial={{ rotate: 0 }}
          animate={{
              rotate: 360,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration:7
          }}
          >Our Products</motion.h1>
          <div className="buttons d-flex justify-content-center mt-5  pb-5">
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => {
                setFilter(products);
              }}
            >
              ALL
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => {
                filteredProducts("lab");
              }}
            >
              Lab
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => {
                filteredProducts("tab");
              }}
            >
              Tab
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => {
                filteredProducts("phone");
              }}
            >
              Phones
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => {
                filteredProducts("men's clothing");
              }}
            >
              Men's Clothing
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => {
                filteredProducts("women's clothing");
              }}
            >
              Women's Clothing
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => {
                filteredProducts("other");
              }}
            >
              Other
            </button>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>An error occured...</p>
          ) : (
            <div className='row gap-3 justify-content-center products py-5'> 
            {filter.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                addToCartHandler={addToCartHandler}
              />
            ))}
            </div>
            
          )}
        </div>
      </div>
    </>
  );
}
