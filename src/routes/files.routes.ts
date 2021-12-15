import express from "express";
import FileController from "../controllers/file.controller";
import upload from "../config/upload";

const router = express.Router();

router.post("/", upload.single("file"), FileController.create);
router.get("/", FileController.list);
router.get("/:id", FileController.get);

export default router;
