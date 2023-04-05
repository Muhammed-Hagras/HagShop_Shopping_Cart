const express = require("express");
const { Product } = require("../models/products");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const { isAdmin } = require("../middleware/auth");

//Create

router.post("/", isAdmin, async (req, res) => {
  const { name, brand, desc, price, image } = req.body;
  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "HagShop",
      });

      if (uploadedResponse) {
        const product = new Product({
          name,
          brand,
          desc,
          price,
          image: uploadedResponse,
        });

        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Get one products
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Delete a product

router.delete("/:id", isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    if (!product) return res.status(404).send("Product not found");

    if (product.image.public_id) {
      const destoryResponse = await cloudinary.uploader.destroy(
        product.image.public_id
      );

      if (destoryResponse) {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).send(deletedProduct);
      } else {
        console.log("Action cancelled, Failed to delete product image");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Edit a product

router.put("/:id", isAdmin, async (req, res) => {
  if (req.body.productImg) {
    try {
      const destoryResponse = await cloudinary.uploader.destroy(
        req.body.product.image.public_id
      );

      if (destoryResponse) {
        const uploadedResponse = await cloudinary.uploader.upload(
          req.body.productImg,
          {
            upload_preset: "HagShop",
          }
        );

        if (uploadedResponse) {
          const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                ...req.body.product,
                image: uploadedResponse,
              },
            },
            { new: true }
          );

          res.status(200).send(updatedProduct);
        }
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.product,
        },
        { new: true }
      );

      res.status(200).send(updatedProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

module.exports = router;
