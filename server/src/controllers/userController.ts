import { Request, Response, NextFunction } from 'express'
import { IRequestWithUser, IUserAttributes } from '../models/IUser.js'
import { Basket, User } from '../models/models.js'
import userService from '../services/userService.js'
import { IRole } from '../models/IRole.js'
import ApiError from '../error/ApiError.js'
import UserDTO from '../dtos/userDto.js'

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, roles } = req.body

      const userData = await userService.registration(email, password, roles as IRole[])

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      await Basket.create({ UserId: userData.user.id })

      return res.status(201).json(userData)
    } catch (error) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const userData = await userService.login(email, password)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.status(200).json(token)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req: IRequestWithUser, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies

      const userData = await userService.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers()
      return res.json(users)
    } catch (error) {
      next(error)
    }
  }

  async ban(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, banReason } = req.body

      // Найти пользователя по id и обновить соответствующие поля
      const [numRowsUpdated, [updatedUser]] = await User.update(
        { isBan: true, banReason },
        { returning: true, where: { id: userId } },
      )

      if (numRowsUpdated === 0) {
        throw ApiError.BadRequest('Пользователь не найден')
      }

      const user = new UserDTO(updatedUser as unknown as IUserAttributes)

      return res.json(user)
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
