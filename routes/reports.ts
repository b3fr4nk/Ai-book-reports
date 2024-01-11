import Express from "express";
import {
  getReport,
  newReport,
  getAllReports,
  deleteReport,
} from "../controllers/report/report";

const router = Express.Router();

router.use("/reports", router);

router.get("/reports/", getAllReports);
router.get("/reports/:bookId", getReport);
// router.get("/new", newReport);
router.delete("/reports/delete/:reportId", deleteReport);

export default router;
