const express = require('express');

const cors = require('cors');
const products = require('./products');

const app = express();


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/products', (req, res) => {
    res.send(products);
});

const port = process.env.port || 8000;

app.listen(port, () => {
    console.log('Example app listening on port 8000!');
});