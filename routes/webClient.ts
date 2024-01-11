import Express from "express";
import {
  browsePage,
  homePage,
  reportPage,
  uploadPage,
  uploadingPage,
} from "../controllers/book/bookWeb";

const router = Express.Router();

router.use("/client", router);

router.get("/home", homePage);
router.get("/upload", uploadPage);
router.get("/uploading", uploadingPage);
router.get("/browse", browsePage);
router.get("/report/:reportId", reportPage);

export default router;
