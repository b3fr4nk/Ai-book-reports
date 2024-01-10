import { Request, Response, NextFunction } from "express";

export const homePage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("home.handlebars");
};

export const uploadPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("upload.handlebars");
};

export const uploadingPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("uploading.handlebars");
};

export const browsePage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = await (
    await fetch("http://localhost:3000/api/reports")
  ).json();
  res.render("browse.handlebars", response);
};
