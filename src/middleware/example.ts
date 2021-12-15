import { NextFunction, Request, Response } from "express"

function exampleMiddleware(req: Request, res: Response, next: NextFunction) {
    next()
}

export default exampleMiddleware