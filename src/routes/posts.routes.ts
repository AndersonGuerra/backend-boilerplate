import express from "express";
import isAuthenticated from "../middleware/isAuthenticated";
import PostController from "../controllers/post.controller";

const router = express.Router();

router.post("/", isAuthenticated, PostController.create);
router.get("/", PostController.list);

export default {
  name: "/posts",
  router: router,
};
