import { createTable, openTable } from "../ai/vectors";
import Book from "../../models/book";
import { Request, Response, NextFunction } from "express";

// add book to databases
export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, author } = req.body;

    if (req.file === undefined || title === undefined) {
      return res.status(400);
    } else {
      const path = req.file.path;

      const fields = { title, author, path };

      const foundBook = await Book.findOne({ title: title });

      if (foundBook !== null) {
        return res.status(400).json({ message: "book already exists" });
      }

      const book = new Book(fields);
      await book.save();

      createTable(title, path);

      return res.status(200).json({ success: "true", book: `${title} added` });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const searchBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, author } = req.body;

    const book = await Book.findOne({ title: title, author: author });

    if (!book) {
      return res
        .status(400)
        .json({ message: `no book with title: ${title} and author ${author}` });
    }

    return res.status(200).json({ message: "found book", book });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find();

    return res.status(200).json({ books });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
