const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const connectdb = require("./config/connectdb");
const userRoute = require("./routes/routeuser");
require("dotenv").config();

app.use(cors());
app.use(express.json());

connectdb();

app.use("/auth", userRoute);

app.get("/", (req, res) => {
  try {
    res.send(`welcome to localcost ${port}`);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, (err) => {
  err ? console.log(err) : console.log(`go to port : ${port} `);
});
