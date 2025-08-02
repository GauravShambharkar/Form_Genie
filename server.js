const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

var newUser = [];

app.get("/", (req, res) => {
  res.send({
    msg: "Hello, World!",
  });
  res.redirect();
});

app.post("/save", (req, res) => {
  const { name, email } = req.body;

  const user = newUser.push(name, email);

  res.send({
    user: newUser,
  });
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port https://localhost:3000");
});
