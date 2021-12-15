import express from "express";
import isAuthenticated from "../middleware/isAuthenticated";
import UserController from "../controllers/user.controller";
import isSelfUser from "../middleware/isSelfUser";

const router = express.Router();

router.get("/", UserController.list);

router.get("/:id", UserController.get);

router.post("/", UserController.create);

router.patch("/:id", isAuthenticated, isSelfUser, UserController.update); // falta um isSelfUser

export default router;
