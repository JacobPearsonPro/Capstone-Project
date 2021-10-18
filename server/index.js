const express = require("express");
const app = express();

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};
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
