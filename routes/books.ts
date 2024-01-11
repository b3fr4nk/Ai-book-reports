import Express from "express";
import {
  addBook,
  searchBook,
  getAllBooks,
  getBookById,
  deleteBook,
} from "../controllers/book/book";

import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Express.Router();

router.use("/books", router);

router.post("/books/new", upload.single("book"), addBook);
router.get("/books/", getAllBooks);
router.get("/books/:bookId", getBookById);
router.post("/books/search", searchBook);
router.delete("/books/delete/:bookId", deleteBook);

export default router;
