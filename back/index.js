const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const columns = require('./routes/columns');
const cards = require('./routes/cards');

const app = express();
app.use(cors())

mongoose.connect('mongodb+srv://admin:itiAmazon@cluster0.ke6bvtv.mongodb.net/todo').then(() => console.log("db connection pass")).catch(console.log("err"))
app.use(express.json());
app.all("/", (req, res) => { res.send("Hello World"); })
app.use("/columns", columns)
app.use("/cards", cards)
// app.use("/user", card)
const server=app.listen(3000)
