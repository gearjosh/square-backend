require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

MongoClient.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.eu7jt.mongodb.net/squares?retryWrites=true&w=majority`,
  { useUnifiedTopology: true }
).then((client) => {
  console.log("Connected to Database");

  const db = client.db("squaresDB");
  const squaresCollection = db.collection("squares");

  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
  
  app.post("/squares", (req, res) => {
    squaresCollection
      .insertOne(req.body)
      .then((result) => {
        console.log(result);
        res.redirect("/");
      })
      .catch((error) => console.error(error));
  });
  
  app.listen(3000, function () {
    console.log("listening on 3000");
  });

}).catch(console.error);