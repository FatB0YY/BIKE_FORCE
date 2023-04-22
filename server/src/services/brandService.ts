import ApiError from '../error/ApiError.js'
import { Brand } from '../models/models.js'

class BrandService {
  async create(name: string) {
    const brandCandidate = await Brand.findOne({
      where: { name },
    })

    if (brandCandidate) {
      throw ApiError.BadRequest(`Бренд ${name} уже существует`)
    }

    const brand = await Brand.create({ name })

    return brand
  }
}

export default new BrandService()
