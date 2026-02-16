const Book = require("../model/book.model");

const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;

    // validation
    if (
      !body.BookName ||
      !body.BookTitle ||
      !body.Author ||
      !body.SellingPrice ||
      !body.PublishDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // create book
    const bookAdd = await Book.create(body);
    if (bookAdd) {
      return res.status(201).json({
        message: "Book added successfully",
        success: true,
        Id: bookAdd?.id,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
const handleBookListController = async (req, res) => {
  try {
    const bookList = await Book.find({});
    return res.status(200).json({
      message: "All Books Fetched Successfully",
      success: true,
      TotalCount: bookList.length,
      BookList: bookList,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
const handleBookDeleteController = async (req, res) => {
  try {
    const { id } = req.body;

    // check id provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required",
      });
    }

    const deleted = await Book.deleteOne({ _id: id });

    // check if book actually existed
    if (deleted.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const handleBookUpdateController = async (req, res) => {
  try {
    const body = req.body;

    const updating = await Book.updateOne({ _id:body?.id }, { $set: body });
    if (updating?.acknowledged) {
      return res.json({
        message: "Book Updated Successfully !",
        success: true,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

module.exports = {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController
};
