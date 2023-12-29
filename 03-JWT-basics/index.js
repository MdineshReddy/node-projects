require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const path = require("path");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const mainRouter = require("./routes/main");

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/api/v1", mainRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
