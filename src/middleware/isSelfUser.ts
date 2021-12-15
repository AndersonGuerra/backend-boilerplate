import { Response, NextFunction } from "express";
import Request from "../interfaces/request.interface";
import prisma from "../database/prisma";

async function isSelfUser(req: Request, res: Response, next: NextFunction) {
  const { user } = req;
  const { id } = req.params;
  if (user.id) {
    const data = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (data && data.id === parseInt(id)) return next();
    return res.status(401).json({ msg: "Sem permissão" });
  }
  return res.status(401).json({ msg: "Sem permissão" });
}

export default isSelfUser;