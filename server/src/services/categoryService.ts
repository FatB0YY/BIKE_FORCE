import ApiError from '../error/ApiError.js'
import { Category } from '../models/models.js'

class CategoryService {
  async create(name: string) {
    const categoryCandidate = await Category.findOne({
      where: { name },
    })

    if (categoryCandidate) {
      throw ApiError.BadRequest(`Категория ${name} уже существует`)
    }

    const category = await Category.create({ name })

    return category
  }
}

export default new CategoryService()
