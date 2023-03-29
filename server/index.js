const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const products = require('./products');
const register = require("./routes/register");
const login = require("./routes/login");

const app = express();


require("dotenv").config();



app.use(express.json());
app.use(cors());

app.use("api/register", register)
app.use("api/login", login);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/products', (req, res) => {
    res.send(products);
});

const port = process.env.port || 8000;

const DB = process.env.MONGO_URL
// console.log(url)

mongoose.connect(DB).then(()=>{
    console.log("DB Connected succefully");
})
.then(() => {
    () => console.log("Mongo DB Connection established successfully...")
})
.catch((error) =>{
    console.log("MongoDB Connection failed...."+error);
});


app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});



