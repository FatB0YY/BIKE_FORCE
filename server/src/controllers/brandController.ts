import { Request, Response, NextFunction } from 'express'
import { Brand, CategoryBrand } from '../models/models.js'
import brandService from '../services/brandService.js'
import ApiError from '../error/ApiError.js'

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

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id

      // Найти продукт по id и обновить соответствующие поля
      const [numRowsUpdated, [updatedBrand]] = await Brand.update(
        { isActive: false },
        { returning: true, where: { id } },
      )

      if (numRowsUpdated === 0) {
        throw ApiError.BadRequest('Категория не найден')
      }

      return res.json(updatedBrand)
    } catch (error) {
      next(error)
    }
  }
}

export default new BrandController()
