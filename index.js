require("dotenv").config();
const mongose = require("./database/index");
const express = require("express");
const app = express();
const getRoute = require("./Routes/router");

//db connection
mongose();

app.use(express.json());

app.use("/api", getRoute);

app.listen(process.env.PORT);
console.log("aplikasi berjalan di http://localhost:5000");