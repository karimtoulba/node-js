const express = require("express");

const app = express();

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

// Endpoint localhost:3000/hi/
app.get("/hi", (req, res) => {
  res.send("You've visited Hi");
});

app.listen(3000);
