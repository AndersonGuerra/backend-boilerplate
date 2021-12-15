import { Response } from "express";
import Request from "src/config/interfaces/request.interface";
import database from "../config/database";

class PostController {
  async create(req: Request, res: Response) {
    const { text } = req.body;
    const data = await database.post.create({
      data: {
        userId: req.user.id,
        text,
      },
    });
    return res.json(data);
  }

  async list(req: Request, res: Response) {
    const data = await database.post.findMany();
    return res.json(data);
  }
}

export default new PostController();
