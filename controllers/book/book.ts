import { createTable } from "../ai/vectors";
import { openTable } from "../ai/vectors";
import { Request, Response, NextFunction } from "express";

// add book to databases
export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name;
    if (req.file === undefined || name === undefined) {
      return res.status(400);
    } else {
      const pathToDoc = req.file.path;
      await createTable(name, pathToDoc);
      return res.status(200).json({ success: "true", book: `${name} added` });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
