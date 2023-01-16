const express = require("express");
const { RegisterModel } = require("../Models/register.model");

const users = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

users.post("/register", async (req, res) => {
  const { email, password, name, gender } = req.body;
  const userExist = await RegisterModel.findOne({ email });
  if (userExist?.email) {
    res.send("please log in, account already exist");
  } else {
    try {
      bcrypt.hash(password, 5, async function (err, hash) {
        const user = new RegisterModel({ name, email, gender, password: hash });
        await user.save();
        res.send("Register Successfully");
        console.log("Register Successfully");
      });
    } catch (error) {
      console.log(error);
      res.send("oops, Something went wrong, please try again");
    }
  }
});

users.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await RegisterModel.find({ email });
    if (user.length > 0) {
      const hashPassword = user[0].password;
      bcrypt.compare(password, hashPassword, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id },  "masai");
          res.send({ mesage: "login succeessfull", token: token });
        } else {
          res.send("Login unsuccessful");
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send("oops, Something went wrong, please try again");
  }
});

module.exports = {
    users
}