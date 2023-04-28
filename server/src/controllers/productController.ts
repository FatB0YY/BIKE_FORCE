import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { Product, ProductInfo } from '../models/models.js'
import ApiError from '../error/ApiError.js'
import fileDirName from '../utils/fileDirName.js'
import fs from 'fs'

const { __dirname, __filename } = fileDirName(import.meta)

class ProductController {
  async create(req: any, res: Response, next: NextFunction) {
    try {
      let { name, price, BrandId, CategoryId, info, count } = req.body

      if (!req.files) {
        throw ApiError.BadRequest('req.files is undefined')
      }

      const img = req.files.img

      const productCandidate = await Product.findOne({
        where: { name },
      })

      if (productCandidate) {
        throw ApiError.BadRequest(`Продукт ${name} уже существует`)
      }

      const dir = path.join(__dirname, '..', 'static')

      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
          throw ApiError.internalError('Ошибка при создании папки static', [err])
        }
        console.log(`Directory ${dir} created successfully`)
      })

      // уникальное имя
      let fileName = uuidv4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      // исправить тип
      const product = (await Product.create({
        name,
        price,
        BrandId,
        CategoryId,
        img: fileName,
        count,
      })) as any

      if (info) {
        info = JSON.parse(info)
        info.forEach((i: { title: string; description: string; id: number }) =>
          ProductInfo.create({
            title: i.title,
            description: i.description,
            ProductId: product.id,
          }),
        )
      }

      return res.json(product)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      let { BrandId, CategoryId, limit, page } = req.query
      let limitNumber = parseInt(limit as string, 10) || 9
      let pageNumber = parseInt(page as string, 10) || 1
      let offset = pageNumber * limitNumber - limitNumber
      let products

      if (!BrandId && !CategoryId) {
        products = await Product.findAndCountAll({ limit: limitNumber, offset })
      }

      if (!BrandId && CategoryId) {
        products = await Product.findAndCountAll({
          where: { CategoryId },
          limit: limitNumber,
          offset,
        })
      }

      if (BrandId && !CategoryId) {
        products = await Product.findAndCountAll({
          where: { BrandId },
          limit: limitNumber,
          offset,
        })
      }

      if (BrandId && CategoryId) {
        products = await Product.findAndCountAll({
          where: { BrandId, CategoryId },
          limit: limitNumber,
          offset,
        })
      }

      return res.json(products)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const product = await Product.findOne({
        where: { id },
        include: [{ model: ProductInfo, as: 'info' }],
      })
      return res.json(product)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id

      // Найти продукт по id и обновить соответствующие поля
      const [numRowsUpdated, [updatedProduct]] = await Product.update(
        { isActive: false },
        { returning: true, where: { id } },
      )

      if (numRowsUpdated === 0) {
        throw ApiError.BadRequest('Продукт не найден')
      }

      return res.json(updatedProduct)
    } catch (error) {
      next(error)
    }
  }
}

export default new ProductController()
