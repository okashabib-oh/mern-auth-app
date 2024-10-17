const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')
require('dotenv').config();
require("./Models/db")

const PORT = process.env.PORT

app.get('/okasha', (req, res) => {
    res.send('Hello!')
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter)

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})