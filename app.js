const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let LIBRARY = [];
let LENGTH = 0;

app.get("/health", (req, res) => {
  res.status(200).send("Don't panic.");
});





module.exports = app;
app.use(express.static("public"));