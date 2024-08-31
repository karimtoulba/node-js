const express = require("express");
const article = require("./models/articles");

const app = express();

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://nodeUser:nodePassword@pets-adoption.lu7j6.mongodb.net/nodeDatabase?retryWrites=true&w=majority&appName=pets-adoption")
  .then(function () {
    console.log("Connected Successfully");
  })
  .catch(function (error) {
    console.log("Unable to Connect", error);
  });

// Use JSON
app.use(express.json());

// Endpoint localhost:3000/hi/
app.get("/hi", (req, res) => {
  res.send("You've visited Hi");
});

// Endpoint localhost:3000/hello
app.get("/hello", function (req, res) {
  let numbers;
  for (let i = 0; i <= 10; i++) {
    numbers += i + "-";
  }
  res.send(`Hello World ${numbers}`);
});

// Endpoint localhost:3000/findSum (REQ PARAMETERS)
app.get("/findSum/:num1/:num2", function (req, res) {
  const num1 = req.params.num1;
  const num2 = req.params.num2;
  const total = Number(num1) + Number(num2);
  res.send(`You're in finSum endpoint!<br>The total is ${total}`);
});

// Endpoint localhost:3000/welcome?name=Karim&age=34 (QUERY PARAMETERS)
app.get("/welcome", function (req, res) {
  let name = req.query.name;
  let age = req.query.age;
  res.send(`Name is ${name} and Age is ${age}`);
});

// Endpoint returning JSON response
app.get("/try", function (req, res) {
  res.json({
    name: req.query.name,
    age: req.query.age,
    language: "Arabic",
  });
});

// Endpoint returning HTML file using EJS && QUERY in url
app.get("/ejs", function (req, res) {
  // res.sendFile(__dirname + "/views/file.html");
  res.render("file.ejs", {
    name: req.query.name,
    age: req.query.age,
  });
});

// Endpoint for posting articles to Database
app.post("/article", async function (req, res) {
  const newArticle = new article();

  newArticle.name = "Hello World";
  newArticle.description = "Lorem Ipsum paragraph for testing";
  newArticle.number = 83;
  await newArticle.save();

  res.send("Article has been saved successfully!");
});

// Endpoint for reading articles from Database
app.get("/article", async function (req, res) {
  const articles = await article.find();
  res.json(articles);
});

//Endpoint for reading one article by ID from Database
app.get("/article/:id", async function (req, res) {
  const theid = req.params.id;
  const articles = await article.findById(theid);
  res.json(articles);
});

// Endpoint for deleting one article by ID from Database
app.delete("/article/:id", async function (req, res) {
  const theid = req.params.id;
  await article.findByIdAndDelete(theid);
  res.send(`Article ${theid} has been deleted successfully!`);
});

// Endpoint for showing articles using EJS file
app.get("/all-articles", async function (req, res) {
  const allArticles = await article.find();
  res.render("all-articles.ejs", {
    articlesHTML: allArticles,
  });
});

//Listen
app.listen(3000, function () {
  console.log("I'm listening to port 3000");
});
