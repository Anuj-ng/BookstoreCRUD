const express = require("express");
const {
  handleBookStoreController,
  handleBookListController,handleBookDeleteController,handleBookUpdateController
} = require("../controller/book.controller.js");

const router = express.Router();

router.post("/addbook", handleBookStoreController);
router.get("/bookList", handleBookListController);
router.delete("/deletebook", handleBookDeleteController);
router.put("/updatebook", handleBookUpdateController);

module.exports = router;
