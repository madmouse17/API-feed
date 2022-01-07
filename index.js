require("dotenv").config();
const mongose = require("./database/index");
const express = require("express");
const app = express();
const getRoute = require("./Routes/router");
const bodyParser = require("body-parser");

//db connection
mongose();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", getRoute);

app.listen(process.env.PORT);
console.log("aplikasi berjalan di http://localhost:5000");