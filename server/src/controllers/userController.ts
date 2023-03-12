import { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'
import { IRequestWithUser } from '../models/IUser'
import { Basket } from '../models/models'
import tokenService from '../services/tokenService'
import userService from '../services/userService'

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body
      const userData = await userService.registration(email, password, role)
      const basket = await Basket.create({ UserId: userData.user.id })

      return res.status(201).json(userData)
    } catch (error) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req: IRequestWithUser, res: Response, next: NextFunction) {
    try {
      const data = {
        id: req.user!.id,
        email: req.user!.email,
        role: req.user!.role,
      }
      const token = tokenService.generateToken(data)
      return res.json(token)
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
