const express = require('express');
const { Product } = require('../models/products')
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const { isAdmin } = require('../middleware/auth');


//Create

router.post("/", isAdmin ,async( req, res ) => {
    const { name, brand, desc, price, image} = req.body;
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
})

// Get all products
router.get('/', async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;
