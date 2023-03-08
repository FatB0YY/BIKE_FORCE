import { Request, Response, NextFunction } from 'express'

export default class BrandController {
  async create(req: Request, res: Response, next: NextFunction) {}
  async getAll(req: Request, res: Response, next: NextFunction) {}
}

module.exports = new BrandController()
