import { Response, NextFunction } from "express";
import Request from "../interfaces/request.interface";
import fs from "fs";
import path from "path";

const MESSAGES = {
  not_found:
    "Objeto não encontrado na base da dados, por favor tente novamente",
  no_permission: "Sem permissão para acessar",
  not_in_schedule: "Fora do período",
};

class AppError {
  public readonly status: number;

  public readonly message: string;

  constructor(
    status = 500,
    message = "Falha na operação, por favor tente novamente"
  ) {
    this.status = status;
    this.message = message;
  }
}

async function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // if (req.file) {
  //   await fs.promises.unlink(path.join(upload.directory, req.file.filename))
  // }
  console.log(error);
  if (error instanceof AppError) {
    const status = error.status || 500;
    const message =
      error.message || "Falha na operação, por favor tente novamente";
    return res.status(status).json({
      status,
      message,
    });
  }
  return res.status(500).json({
    status: 500,
    message: "Falha na operação, por favor tente novamente",
  });
}

export { MESSAGES };
export { AppError };
export default errorMiddleware;
