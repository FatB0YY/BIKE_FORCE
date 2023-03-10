import { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'
import { Brand } from '../models/models'

class BrandController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body
      const brandCandidate = await Brand.findOne({
        where: { name },
      })

      if (brandCandidate) {
        throw ApiError.badRequest(`Бренд с именем ${name} уже существует`)
      }

      const brand = await Brand.create({ name })
      return res.json(brand)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const brands = await Brand.findAll()
      return res.json(brands)
    } catch (error) {
      next(error)
    }
  }
}

export default new BrandController()
