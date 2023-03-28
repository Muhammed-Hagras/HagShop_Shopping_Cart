import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";



export default function ProductItem({ product, dispatch}) {

    const navigate = useNavigate();

    const addToCartHandler = (product) => {
        dispatch(addToCart(product));
        navigate("/cart");
    }

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <Card style={{ width: "19rem" }} className="p-3 shadow">
      <Card.Title className="fw-bold">{product.name}</Card.Title>
      <Card.Img variant="top" src={product.image} className="product-image" />
      <Card.Body>
        <div className="d-flex justify-content-between my-2">
          <Card.Text>{truncate(product.description, 20)}</Card.Text>
          <Card.Title>{product.price} $</Card.Title>
        </div>

        <Button className="w-75" variant="info" href={product.url}
        onClick={() => addToCartHandler(product)}
        >
          Add tor cart
        </Button>
      </Card.Body>
    </Card>
  );
}
