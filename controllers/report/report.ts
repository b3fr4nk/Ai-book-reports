import { Request, Response, NextFunction } from "express";
import Report from "../../models/report";
import { createReport } from "../ai/report";
import { paginate } from "../paginate";

export const getReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    console.log(bookId);

    const report = await Report.findById(bookId);

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

// for tuning the model will not be used in production
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

export const getAllReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentPage = +req.params.page || 1;
    let reports = await Report.find();

    res
      .status(200)
      .json(paginate(reports, { currentPage: currentPage, itemsPerPage: 20 }));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const deleteReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Report.findByIdAndDelete(req.params.reportId);

    return res.status(200).json({
      message: "Book deleted",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
