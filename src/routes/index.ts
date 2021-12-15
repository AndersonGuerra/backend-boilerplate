import fs from "fs";
import path from "path";
import express from "express";

const mainRouter = express.Router();

fs.readdirSync(__dirname).forEach((file) => {
  if (!file.includes("index")) {
    const filePath = path.join(__dirname, file);
    import(filePath).then((route) => {
      const { name, router } = route.default;
      mainRouter.use(name, router);
    });
  }
});

export default mainRouter;
