const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let LIBRARY = [];
let LENGTH = 0;

app.get("/", (req, res) => {
  res.status(200).send("App is Working!");
});

app.get("/health", (req, res) => {
  res.status(200).send("Don't panic.");
});


app.post("/api/books", function(req, res) {
  const author = req.body.author;
  const title = req.body.title;
  const year = req.body.year;

  if (author && title && year) {
    let book = {
      "id": (LENGTH + 1),
      "author": author,
      "title": title,
      "year": year
    };
    LENGTH = LENGTH + 1;
    LIBRARY.push(book);
    res.status(201).send({
      "author": author,
      "title": title,
      "year": year});
  } else {
    res.status(400).send("Parameters are not present. Please try again!")
  } 
});

app.get("/api/books", function(req, res) {
  let sortedBooks = LIBRARY;
  sortedBooks.sort((book1, book2) => (book1.author > book2.author) ? 1 : -1)
  res.status(200).send(sortedBooks);
});

app.delete("/api/books", function(req, res) {
  LIBRARY = [];
  res.status(204).send();
});




module.exports = app;
app.use(express.static("public"));