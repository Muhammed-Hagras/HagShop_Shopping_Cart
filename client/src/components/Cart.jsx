import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import CartItem from "./CartItem";
import CartTitles from "./CartTitles";
import { useDispatch } from "react-redux";
import { clearCart, getTotals } from "./../store/cartSlice";
import PayButton from "./payment/PayButton";

const Cart = () => {
  const dispatch = useDispatch();

  const clearCartHandler = () => dispatch(clearCart());

  const { cartItems, cartTotalAmount } = useSelector(
    (state) => state.cartReducer
  );
  const { _id } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="cart-container bg-light text-center h-100">
      <Container className="py-3">
        <div className="shopping-cart mt-3">
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <>
              <p>Cart is empty...</p>
              <div className="start-shopping">
                <NavLink to="/" className="text-decoration-none  text-muted ">
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
                  <span>Start Shopping</span>
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <div className="cart-titles mt-5 row  ">
                <CartTitles />
              </div>
              <div className="cart-items ">
                {cartItems &&
                  cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
              </div>
              <div className="cart-summary d-flex pb-5 mt-5 justify-content-between ">
                <button
                  className="clear-btn btn btn-danger h-50 py-3 px-5 "
                  onClick={() => clearCartHandler()}
                >
                  Clear Cart
                </button>
                <div className="cart-checkout shadow p-5  ">
                  <div className="subtotal d-flex justify-content-between my-3">
                    <span>Subtotal</span>
                    <span>{cartTotalAmount}</span>
                  </div>
                  <p>Taxes and shipping calculated at checkout</p>
                  {_id ? (
                    
                    <PayButton cartItems={cartItems} />
                  ) : (
                    <NavLink
                      to="/login"
                      className="btn btn-warning w-100 fs-5 mb-3"
                    >
                      Login to Checkout
                    </NavLink>
                  )}
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
                {/* <CartCheckOut cartTotalAmount={cartTotalAmount} dispatch={dispatch}/> */}
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Cart;
