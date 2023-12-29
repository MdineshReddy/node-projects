const express = require("express");
const app = express();
require("express-async-errors");
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const productRouter = require("./routes/products");

require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1> <a href='/api/v1/products'>Products</a>");
});

app.use("/api/v1/products", productRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on PORT:${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
