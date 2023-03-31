import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, decreaseCart, removeFromCart } from "./../store/cartSlice"


export default function CartItem({ item }) {
    const dispatch = useDispatch();
    const cartRemoveHandler = (item) => {
        dispatch(removeFromCart(item))
    }

    const decreaseCartHandler = (item) => {
      dispatch(decreaseCart(item));
  }

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };


  return (
    <div className="cart-item border-top border-bottom py-5 row align-items-center ">
      <div className="cart-product col-6 d-flex  align-items-center">
        <img
          src={item.image}
          alt={item.name}
          className="cart-product-price-image me-3 mw-100"
        />
        <div className="cart-product-desc">
          <h3 className="cart-product-title">{item.name}</h3>
          <p className="cart-product-description h6">{item.description}</p>
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
    </div>
  );
}
