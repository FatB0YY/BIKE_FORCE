import { Request, Response, NextFunction } from 'express'

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {}

  async login(req: Request, res: Response, next: NextFunction) {}

  async refresh(req: Request, res: Response, next: NextFunction) {}
}

export default new UserController()
