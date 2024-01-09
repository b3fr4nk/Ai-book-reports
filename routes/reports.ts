import Express from "express";
import { getReport, newReport } from "../controllers/report/report";

const router = Express.Router();

router.use("/reports", router);

router.get("/:bookId", getReport);

export default router;
