import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductItem({ product, addToCartHandler }) {
  // const dispatch = useDispatch()
  const navigate = useNavigate();

  // const addToCartHandler = (product) => {
  //   dispatch(addToCart(product));
  //   // navigate("/cart");
  // };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <motion.Card style={{ width: "19rem" }} className="p-3 shadow"
    whileHover={{ y:-50 }}
    initial={{ y: 150 }}
    animate={{
      y: 0,
    }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration:3
    }}
    >
      
      <Card.Title className="fw-bold">{product.name}</Card.Title>
      <Card.Img
        variant="top"
        src={product.image.url}
        alt={product.name}
        className="product-image"
      />
      <Card.Body>
        <div className="d-flex justify-content-between my-2">
          <Card.Text>{truncate(product.desc, 20)}</Card.Text>
          <Card.Title>{product.price} $</Card.Title>
        </div>

        <Button
          className="w-75"
          variant="dark"
          onClick={() => addToCartHandler(product)}
        >
          Add tor cart
        </Button>
      </Card.Body>
    </motion.Card>
  );
}
