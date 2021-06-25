const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hz5rx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const bookingCollection = client
    .db("airTicketBooking")
    .collection("bookingData");
  console.log("db connected successfully");

  app.post("/booking", (req, res) => {
    const booking = req.body;
    console.log("adding new booking", booking);
    bookingCollection.insertOne(booking).then((result) => {
      console.log("inserted count", result.insertedCount);
      res.send(result.insertedCount > 0);
    });
  });
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
