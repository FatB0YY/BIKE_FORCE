import { Request, Response, NextFunction } from 'express'

export default class TypeController {
  async create(req: Request, res: Response, next: NextFunction) {}

  async getAll(req: Request, res: Response, next: NextFunction) {}
}

module.exports = new TypeController()
