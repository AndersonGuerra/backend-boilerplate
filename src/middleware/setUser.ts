import { Response, NextFunction } from "express";
import Request from "../config/interfaces/request.interface";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function setUser(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (authorization) {
    jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ msg: "Token inválido" });
      req.user = decoded;
    });
  }
  return next();
}

export default setUser;
