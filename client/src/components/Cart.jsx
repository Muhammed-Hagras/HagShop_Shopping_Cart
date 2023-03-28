import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";

const Cart = () => {
  const { cartItems, cartTotalAmount } = useSelector(
    (state) => state.cartReducer
  );

  return (
    <div className="cart-container bg-light text-center vh-100">
      <Container className="py-3">
        <div className="shopping-cart mt-3">
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <>
              <p>Cart is empty...</p>
              <div className="start-shopping">
                <NavLink to="/" className="text-decoration-none  text-muted " >
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
                  <span >Start Shopping</span>
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <div className="cart-titles mt-5 row  ">
                <h3 className="product-title col-6 ">Product</h3>
                <h3 className="price-title col-2">Price</h3>
                <h3 className="quantitiy-title col-2 pe-5">Quantity</h3>
                <h3 className="total-title col-2 ">Total</h3>
              </div>
              <div className="cart-items ">
                {cartItems &&
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="cart-item border-top border-bottom py-5 row align-items-center "
                    >
                      <div className="cart-product col-6 d-flex  align-items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-product-price-image me-3"
                        />
                        <div className="cart-product-desc">
                          <h3 className="cart-product-title">{item.name}</h3>
                          <p className="cart-product-description h6">
                            {item.description}
                          </p>
                          <button className="btn btn-light ">Remove</button>
                        </div>
                      </div>
                      <div className="cart-product-price col-2 h3">
                        {item.price}
                      </div>
                      <div className="cart-product-quantity border rounded col-2 h3 d-flex justify-content-center align-items-center ">
                        <button className="btn">-</button>
                        <p className="pt-3 mx-3">{item.quantity}</p>
                        <button className="btn">+</button>
                      </div>
                      <div className="cart-product-total col-2 h3">
                        {item.quantity * item.price}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="cart-summary d-flex mt-5 justify-content-between ">
                <button className="clear-btn btn btn-danger h-50 py-3 px-5 ">
                  Clear Cart
                </button>
                <div className="cart-checkout">
                  <div className="subtotal d-flex justify-content-between my-3">
                    <span>Subtotal</span>
                    <span>{cartTotalAmount}</span>
                  </div>
                  <p>Taxes and shipping calculated at checkout</p>
                  <button className="btn btn-info w-100 fs-5 mb-3" >Check out</button>
                  <div className="continue-shopping">
                    <NavLink to="/" className="text-decoration-none d-flex align-items-center text-muted">
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
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Cart;

{
  /* <h3 className="cart-summary-title">Subtotal</h3>
                <h3 className="cart-summary-price">
                  {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </h3>
                <h3 className="cart-summary-title">Shipping</h3>
                <h3 className="cart-summary-price">
                  {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </h3>
                <h3 className="cart-summary-title">Tax</h3>
                <h3 className="cart-summary-price">
                  {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </h3> */
}
