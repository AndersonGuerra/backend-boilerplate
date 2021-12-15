import express from "express";
import FileController from "../controllers/file.controller";
import upload from "../multer/storage";

const router = express.Router();

router.post("/", upload.single("file"), FileController.create);
router.get("/", FileController.list);
router.get("/:id", FileController.get);

export default router;
