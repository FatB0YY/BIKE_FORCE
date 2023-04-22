import { Request, Response, NextFunction } from 'express'
import { Category } from '../models/models.js'
import categoryService from '../services/categoryService.js'
import ApiError from '../error/ApiError.js'

class CategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body
      const category = await categoryService.create(name)

      return res.json(category)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await Category.findAll()
      return res.json(categories)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id

      // Найти продукт по id и обновить соответствующие поля
      const [numRowsUpdated, [updatedCategory]] = await Category.update(
        { isActive: false },
        { returning: true, where: { id } },
      )

      if (numRowsUpdated === 0) {
        throw ApiError.BadRequest('Категория не найден')
      }

      return res.json(updatedCategory)
    } catch (error) {
      next(error)
    }
  }
}

export default new CategoryController()
