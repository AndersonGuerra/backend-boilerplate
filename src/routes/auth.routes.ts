import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.post("/", UserController.auth);

export default {
  name: "/auth",
  router: router,
};
