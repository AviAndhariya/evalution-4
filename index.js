const express = require("express");
require("dotenv").config();
const { users } = require("./Routes/userRoute");
const { posts } = require("./Routes/postRoute");
const { connection } = require("./Configs/db");
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("welcome"));
app.use("/users", users);
app.use("/posts", posts);

app.listen(process.env.port, async() => {
  try {
    await connection;
      console.log(`connected to db successfully`);
  } catch (error) {
    console.log(error);
    console.log("error connecting in db");
  }
  console.log(`listening on port${process.env.port}`);
});
