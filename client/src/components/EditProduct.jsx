import React, { useState } from "react";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { editProducts } from "../store/productsSlice";

export default function EditProduct({ productId }) {
  const [open, setOpen] = useState(false);
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [desc, setDesc] = useState("");
  const [currentProduct, setCurrentProduct] = useState({});
  const [previewImg, setPreviewImg] = useState("");
  const dispatch = useDispatch();

  const { products , editStatus} = useSelector((state) => state.productsReducres);

  const productImageUploader = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProductImg(reader.result);
      setPreviewImg(reader.result);
    };
  };


  const formHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProducts({
       productImg,
       product: {
        ...currentProduct,
        name: name,
        price: price,
        brand: brand,
        desc: desc,
      }})
    );
  };

  const handleClickOpen = () => {
    setOpen(true);

    let selectedProduct = products.filter(
      (product) => product._id === productId
    );

    console.log(selectedProduct)
    selectedProduct = selectedProduct[0];
    console.log(selectedProduct)

    setCurrentProduct(selectedProduct);
    setPreviewImg(selectedProduct.image.url);
    setName(selectedProduct.name);
    setPrice(selectedProduct.price);
    setBrand(selectedProduct.brand);
    setDesc(selectedProduct.desc);
    setProductImg("");
    console.log(selectedProduct);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Edit className="btn btn-primary" onClick={handleClickOpen}>
        Edit
      </Edit>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <div className="product-form d-flex justify-content-between gap-3">
            <Form
              className="bg-dark py-5 px-5 w-50 rounded text-white mb-5 shadow"
              onSubmit={formHandler}
            >
              <h2>Create Products</h2>
              <Form.Group className="my-3" controlId="formBasicImage">
                <Form.Control
                  type="file"
                  placeholder="Image"
                  accept="image/"
                  onChange={productImageUploader}
                />
              </Form.Group>
              <Form.Select
                aria-label="Default select example"
                className="my-3"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option> select Brand</option>
                <option value="iphone">iphone</option>
                <option value="samsung">Samsung</option>
                <option value="lab">Lab</option>
                <option value="tablet">Tablet</option>
                <option value="other">Other</option>
              </Form.Select>
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem distinctio perferendis hic vel accusamus, sunt nulla laborum vero dolor non cum et! Consequuntur quod dignissimos reiciendis necessitatibus laborum totam minima? */}
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Control
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="my-3" controlId="formBasicDesc">
                <Form.Control
                  type="text"
                  value={desc}
                  placeholder="Short Description"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Form.Group>

              <Button  type="submit" className="btn btn-primary">
                {editStatus === "pending" ? "Submitting" : "Submit"}
              </Button>
            </Form>
            <div className="image-preview border rounded shadow w-50 gap-5 d-flex justify-content-center align-items-center">
              {previewImg ? (
                <>
                  <img
                    src={previewImg}
                    alt="Product Image"
                    className="mw-100"
                  />
                </>
              ) : (
                <div className=" ">
                  <div className="spinner-border text-primary " role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Edit = styled.div`
  border: none;
  outlined: none;
  cursor: pointer;
`;
