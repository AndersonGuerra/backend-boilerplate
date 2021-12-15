import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import hashPassword from "../utils/hashPassword";
import comparePassword from "../utils/comparePassword";
import "dotenv/config";
import { AppError } from "../middleware/errorHandler";
import prisma from "../config/database";

class UserController {
  async create(req: Request, res: Response) {
    /**
     * #swagger.tags = ['users']
     */
    let userData = req.body;
    userData.password = await hashPassword(userData.password);
    const data = await prisma.user.create({
      data: userData,
    });
    return res.json({
      name: data.name,
      email: data.email,
    });
  }

  async list(req: Request, res: Response) {
    /**
     * #swagger.tags = ['users']
     */
    const data = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        posts: {
          select: {
            text: true,
          },
        },
      },
    });
    return res.json(data);
  }

  async get(req: Request, res: Response) {
    /**
     * #swagger.tags = ['users']
     */
    const { id } = req.params;
    const data = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return res.json(data);
  }

  async update(req: Request, res: Response) {
    /**
     * #swagger.tags = ['users']
     */
    const { id } = req.params;
    const { name, email } = req.body;
    const data = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
      },
      select: {
        name: true,
        email: true,
      },
    });
    return res.json(data);
  }

  async auth(req: Request, res: Response) {
    /*
     * #swagger.description = 'Rota de autenticação de usuários'
     * #swagger.tags = ['auth']
     * #swagger.parameters['email'] = {
        in: 'body',
        description: 'Endereço de e-mail do usuário',
        required: true,
        type: 'string'
       }
     */
    const { email, password } = req.body;
    const data = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (data) {
      const samePassword = await comparePassword(password, data.password);
      const userData = {
        id: data.id,
        name: data.name,
        email: data.email,
      };
      if (samePassword) {
        const token = jwt.sign(userData, process.env.SECRET);
        return res.json({ auth: true, token });
      }
      throw new AppError(401, "Email ou senha inválidos");
    }
    throw new AppError(404, "Usuário não encontrado");
  }
}

export default new UserController();
