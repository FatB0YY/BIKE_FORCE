import { Request, Response, NextFunction } from 'express'

export default class DeviceController {
  async create(req: Request, res: Response, next: NextFunction) {}

  async getAll(req: Request, res: Response, next: NextFunction) {}

  async getOne(req: Request, res: Response, next: NextFunction) {}
}

module.exports = new DeviceController()
