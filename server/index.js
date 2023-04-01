const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const products = require('./products');
const register = require("./routes/register");
const login = require("./routes/login");
const stripe = require("./routes/stripe");
const productRouter = require("./routes/proudcts");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/register", register)
app.use("/api/login", login);
app.use("/api/stripe", stripe);  
app.use("/api/products", productRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/products', (req, res) => {
    res.send(products);
});

const DB = process.env.MONGO_URL
const port = process.env.port || 8000;

mongoose
.connect(DB)
.then(()=>{console.log("DB Connected succefully")})
.catch((error) =>{ console.log("MongoDB Connection failed...."+error);});

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});



