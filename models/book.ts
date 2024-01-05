import { Date, Document, Model, Schema, model } from "mongoose";

export interface IBookDocument extends Document {
  vector_name: string;
  title: string;
  author: string;
  path: string;
}

// static methods for schemas
export interface IBook extends IBookDocument {}

//interface for book model
interface IBookModel extends Model<IBookDocument, {}> {}

// Book Schema
const BookSchema = new Schema<IBook, IBookModel>({
  vector_name: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    default: "unknown",
  },
  path: {
    type: String,
    required: true,
    unique: true,
  },
});
