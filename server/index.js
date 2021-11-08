const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const deck = require("C:\\Users\\jacob\\Code\\SavvyCoders\\Capstone-Project\\server\\routes\\Deck");

dotenv.config();

const app = express();

// mongoose.connect(process.env.MONGODB);
// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "Connection error:"));
// db.once(
//   "open",
//   console.log.bind(console, "Successfully opened connection to Mongo!")
// );

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(express.json());
app.use(logging);
app.use(cors);

app
  .route("/status")
  .get((request, response) => {
    response.status(200).json({ message: "Service healthy" });
  })
  .post((request, response) => {
    response.json({ requestBody: request.body });
  })
  .delete((request, response) => {
    response.json({ message: "Deleted" });
  })
  .put((request, response) => {
    response.json({ requestBody: request.body });
  });

const PORT = process.env.PORT; // we use || to provide a default value

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
