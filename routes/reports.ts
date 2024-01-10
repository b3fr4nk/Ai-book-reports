import Express from "express";
import {
  getReport,
  newReport,
  getAllReports,
} from "../controllers/report/report";

const router = Express.Router();

router.use("/reports", router);

router.get("/reports/", getAllReports);
router.get("/reports/:bookId", getReport);
// router.get("/new", newReport);

export default router;
