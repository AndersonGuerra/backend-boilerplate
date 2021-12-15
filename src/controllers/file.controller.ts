import { Request, Response } from "express";
import prisma from "../database/prisma";

class FileController {
  async create(req: Request, res: Response) {
    const { title } = req.body;
    const data = await prisma.file.create({
      data: {
        title,
        path: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
      },
    });
    return res.json(data);
  }
  async list(req: Request, res: Response) {
    const data = await prisma.file.findMany({});
    return res.json(data);
  }
  async get(req: Request, res: Response) {
    const { id } = req.params;
    const data = await prisma.file.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return res.download(data.path, data.filename);
  }
}

export default new FileController();
