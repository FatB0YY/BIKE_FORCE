import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { Device, DeviceInfo } from '../models/models'
import ApiError from '../error/ApiError'

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let { name, price, BrandId, TypeId, info } = req.body

      const deviceCandidate = await Device.findOne({
        where: { name },
      })

      if (deviceCandidate) {
        throw ApiError.badRequest(`Девайс с именем ${name} уже существует`)
      }

      // исправить тип
      const { img } = req.files as any

      // уникальное имя
      let fileName = uuidv4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      // исправить тип
      console.log('brandId', BrandId)
      console.log('typeId', TypeId)
      const device = (await Device.create({
        name,
        price,
        BrandId,
        TypeId,
        img: fileName,
      })) as any

      if (info) {
        info = JSON.parse(info)
        info.forEach((i: { title: string; description: string; id: number }) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        )
      }

      return res.json(device)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      let { brandId, typeId, limit, page } = req.query
      let limitNumber = parseInt(limit as string, 10) || 9
      let pageNumber = parseInt(page as string, 10) || 1
      let offset = pageNumber * limitNumber - limitNumber
      let devices

      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit: limitNumber, offset })
      }

      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          limit: limitNumber,
          offset,
        })
      }

      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId },
          limit: limitNumber,
          offset,
        })
      }

      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId, typeId },
          limit: limitNumber,
          offset,
        })
      }

      return res.json(devices)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: 'info' }],
      })
      return res.json(device)
    } catch (error) {
      next(error)
    }
  }
}

export default new DeviceController()
