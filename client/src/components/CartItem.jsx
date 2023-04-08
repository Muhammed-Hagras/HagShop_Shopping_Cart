import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, decreaseCart, removeFromCart } from "./../store/cartSlice"
import { motion } from "framer-motion";



export default function CartItem({ item , idx}) {
    const dispatch = useDispatch();
    const cartRemoveHandler = (item) => {
        dispatch(removeFromCart(item))
    }

    console.log(idx)

    const decreaseCartHandler = (item) => {
      dispatch(decreaseCart(item));
  }

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  
  return (
    <motion.div
    className="cart-item border-top border-bottom py-5 row align-items-center "
    // eslint-disable-next-line eqeqeq
    initial={{ x:  (idx %2  == 0)? 150 : -150 }}
            animate={{
              x: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration:17
            }}
    >
      <div className="cart-product col-6 d-flex  align-items-center "
      
      >
        <img
          src={item.image.url}
          alt={item.name}
          className="cart-product-price-image me-3 cartImg "
        />
        <div className="cart-product-desc text-left">
          <h3 className="cart-product-title">{item.name}</h3>
          <p className="cart-product-description h6">{item.desc}</p>
          <button className="btn btn-dark " onClick={() => cartRemoveHandler(item)}>Remove</button>
        </div>
      </div>
      <div className="cart-product-price col-2 h3">{item.price}</div>
      <div className="cart-product-quantity border rounded col-2 h3 d-flex justify-content-center align-items-center ">
        <button className="btn" onClick={() => decreaseCartHandler(item)}>-</button>
        <p className="pt-3 mx-3">{item.quantity}</p>
        <button className="btn" onClick={() => addToCartHandler(item)}>+</button>
      </div>
      <div className="cart-product-total col-2 h3">
        {item.quantity * item.price}
      </div>
    </motion.div>
  );
}
