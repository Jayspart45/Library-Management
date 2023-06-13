const mongoose = require("mongoose");
// Connect to MongoDB
mongoose.connect("mongodb+srv://jay:1357945@cluster0.u2uewqx.mongodb.net/DevRev", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Create a user schema
const userSchema = new mongoose.Schema({
  email: {
    type:"String",
    required: true
  },
  password: {
    type:"String",
    required: true
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;