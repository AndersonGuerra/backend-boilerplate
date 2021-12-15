import { Response, NextFunction } from "express";
import Request from "src/config/interfaces/request.interface";
import "dotenv/config";

async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ msg: "Necessário estar autenticado" });
  }
}

export default isAuthenticated;
