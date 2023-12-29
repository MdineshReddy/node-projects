const express = require("express");
const path = require("path");
const connectDB = require("./db/connect");
const taskRouter = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/tasks", taskRouter);

app.use(errorHandlerMiddleware);

app.use("*", notFound);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
