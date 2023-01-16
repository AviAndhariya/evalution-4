const express = require("express");
const { PostModel } = require("../Models/post.model");

const posts = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

posts.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const post_data = new PostModel(payload);
    await post_data.save();
    res.send({ message: "post success" });
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});

posts.get("/", async (req, res) => {
  try {
    const data = await PostModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});

posts.patch("/update/:id", async (req, res) => {
  try {
    const payload = req.body;
    const userID = req.body.userID;
    const id = req.params.id;
    const post = await PostModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("post updated");
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});

posts.delete("/delete/:id", async (req, res) => {
  try {
    const userID = req.body.userID;
    const id = req.params.id;
    const post = await PostModel.findOne({ _id: id });
    if (userID != post.userID) {
      res.send("can't delete please authorize");
    } else {
      await PostModel.findByIdAndDelete({ _id: id });
      res.send("post deleted");
    }
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});

module.exports = {
  posts,
};
