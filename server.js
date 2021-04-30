require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/squares", (req, res) => {
  console.log(req.body);
});

MongoClient.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.eu7jt.mongodb.net/squares?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to Database");
  }
);
