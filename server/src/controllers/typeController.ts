import { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'
import { Type } from '../models/models'

class TypeController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body
      const typeCandidate = await Type.findOne({
        where: { name },
      })

      if (typeCandidate) {
        throw ApiError.badRequest(`Тип с именем ${name} уже существует`)
      }

      const type = await Type.create({ name })
      return res.json(type)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const types = await Type.findAll()
      return res.json(types)
    } catch (error) {
      next(error)
    }
  }
}

export default new TypeController()
