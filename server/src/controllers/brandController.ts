import { Request, Response, NextFunction } from 'express'
import { Brand } from '../models/models.js'
import brandService from '../services/brandService.js'

class BrandController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body
      const brand = await brandService.create(name)

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
