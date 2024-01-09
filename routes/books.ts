import Express from "express";
import {
  addBook,
  searchBook,
  getAllBooks,
  getBookById,
} from "../controllers/book/book";

import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Express.Router();

router.use("/books", router);

router.post("/new", upload.single("book"), addBook);
router.get("/", getAllBooks);
router.get("/:bookId", getBookById);
router.post("/search", searchBook);

export default router;
