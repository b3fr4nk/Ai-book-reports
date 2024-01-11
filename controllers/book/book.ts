import { createTable } from "../ai/vectors";
import Book from "../../models/book";
import Report from "../../models/report";
import { Request, Response, NextFunction } from "express";
import { createReport } from "../ai/report";

const addReport = async (title: string, path: string, book: number) => {
  await createTable(title, path);

  const report = await createReport(title);

  const fields = {
    report,
    title,
    book,
  };

  const bookReport = new Report(fields);
  await bookReport.save();

  console.log(report);

  return report;
};

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

      addReport(title, path, book.id);

      return res
        .status(200)
        .json({ success: "true", book: `${book.id} added` });
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
    const { title } = req.body;

    const book = await Book.findOne({ title: title });

    if (!book) {
      return res.status(400).json({ message: `no book with title: ${title}` });
    }

    return res.status(200).json({ message: "found book", book });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    return res.status(200).json({ book, message: `book ${bookId} found` });
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

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);

    return res.status(200).json({
      message: "Book deleted",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
