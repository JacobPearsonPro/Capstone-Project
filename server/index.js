const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

app.use(express.json());
app.use(logging);

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

const PORT = process.env.PORT || 4040; // we use || to provide a default value

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
