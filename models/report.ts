import { Document, Model, Schema, model } from "mongoose";

export interface IReportDocument extends Document {
  title: string;
  report: string;
  dateCreated: Date;
  book: Schema.Types.ObjectId;
}

// static methods for schemas
export interface IReport extends IReportDocument {}

//interface for book model
interface IReportModel extends Model<IReportDocument, {}> {}

// Book Schema
const ReportSchema = new Schema<IReport, IReportModel>({
  title: {
    type: String,
    required: true,
  },
  report: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: null,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
});

const Report = model<IReport>("Report", ReportSchema);

export default Report;
