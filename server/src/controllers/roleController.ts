import { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError.js'
import { Role, User } from '../models/models.js'
import roleService from '../services/roleService.js'

class RoleController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, description } = req.body

      const roleCandidate = await Role.findOne({
        where: { value },
      })

      if (roleCandidate) {
        throw ApiError.BadRequest(`Продукт ${value} уже существует`)
      }

      const role = await Role.create({
        value,
        description,
      })

      return res.json(role)
    } catch (error) {
      next(error)
    }
  }

  async addRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, roles } = req.body

      // Получаем пользователя
      const user = await User.findByPk(userId)

      if (!user) {
        throw ApiError.BadRequest('Пользователь не найден')
      }

      await roleService.addRole(user, roles)

      return res.json(user)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await Role.findAll()

      return res.json(roles)
    } catch (error) {
      next(error)
    }
  }

  async getRoleByName(req: Request, res: Response, next: NextFunction) {
    try {
      const value = req.query.value

      const role = await Role.findOne({
        where: { value },
      })

      if (!role) {
        throw ApiError.BadRequest('Данной роли не существует')
      }

      return res.json(role)
    } catch (error) {
      next(error)
    }
  }

  // http://localhost:8080/api/role/getUserRoles?userId=1
  async getUserRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = Number(req.query.userId)
      const user = await User.findByPk(userId)

      if (!user) {
        throw ApiError.BadRequest('Пользователь не найден')
      }

      const roles = await roleService.getUserRoles(userId)

      return res.json(roles)
    } catch (error) {
      next(error)
    }
  }
}

export default new RoleController()
