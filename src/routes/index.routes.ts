import express from "express";
import AuthRoutes from "./auth.routes";
import UserRoutes from "./users.routes";
import FilesRoutes from "./files.routes";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/files", FilesRoutes);

export default router;
