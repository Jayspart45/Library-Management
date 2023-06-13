const express = require("express");
const collection = require("./mongodb.cjs");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});
app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await collection.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Incorrect Password");
      }
    } else {
      res.json("User not found");
    }
  } catch (e) {
    res.json("Error finding user");
  }
});


app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const data = {
    email: email,
    password: password,
  };
  try {
    const check = await collection.findOne({ email: email });
    if (check) {
      res.json("Exists");
    } else {
      res.json("Not Exists");
      await collection.insertMany([data])
    }
  } catch (e) {
    res.json("Not Found");
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
