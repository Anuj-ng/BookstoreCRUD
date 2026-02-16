require("dotenv").config();
const express = require("express");
const bookRouter = require("./routes/book.routes.js");
const databaseConnection = require("./database");
const cors = require("cors");

databaseConnection();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);
app.use("/book", bookRouter);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Port Listening On ${PORT}`);
});
