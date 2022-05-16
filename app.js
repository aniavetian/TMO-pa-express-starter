const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let LIBRARY = [];
let LENGTH = 0;

app.get("/health", (req, res) => {
  res.status(200).send("Don't panic.");
});


app.post("/api/books", function(req, res) {
  const author = req.body.author;
  const title = req.body.title;
  const yearPublished = req.body.yearPublished;

  if (author && title && yearPublished) {
    let book = {
      "id": (LENGTH + 1),
      "author": author,
      "title": title,
      "yearPublished": yearPublished
    };
    LENGTH = LENGTH + 1;
    LIBRARY.push(book);
    res.status(201).send(book);
  } else {
    res.status(400).send("Parameters are not present. Please try again!")
  } 
});

app.get("/api/books", function(req, res) {
  if (LIBRARY.length > 0) {
    let sortedBooks = LIBRARY;
    sortedBooks.sort((book1, book2) => (book1.title > book2.title) ? 1 : -1);
    res.status(200).send(
      {"books": sortedBooks});
  }
});

app.delete("/api/books", function(req, res) {
  if (LIBRARY.length > 0) {
    LIBRARY = [];
    LENGTH = 0;
    res.status(204);
  }
});


module.exports = app;