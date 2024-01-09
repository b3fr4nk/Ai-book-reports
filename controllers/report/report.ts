import { Request, Response, NextFunction } from "express";
import Report from "../../models/report";
import { createReport } from "../ai/report";

export const getReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;

    const report = await Report.findOne({ book: bookId });

    if (!report) {
      return res.status(400).json("book report does not exist");
    }

    return res.status(200).json({
      report: report,
      message: `succesfully retrieved report for ${report.title}`,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const newReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const report = await createReport("little brother2");
    res.json({ report });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
