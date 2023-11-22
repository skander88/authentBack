const express = require("express");
const userRoute = express.Router();
const { register, login } = require("../controllers/usercontrollers");
const { isAuth } = require("../middlewares/isAuth");
const {
  registerValidation,
  loginValidation,
  validation,
} = require("../middlewares/registerValidation");
userRoute.post("/register", registerValidation, validation, register);

userRoute.post("/login", loginValidation, validation, login);

userRoute.get("/myAccount", isAuth, (req, res) => {
  res.send(req.user);
  console.log(req.user);
});

module.exports = userRoute;
