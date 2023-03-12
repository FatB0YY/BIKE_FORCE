import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../error/ApiError'

function validateMiddleware(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    next(ApiError.badRequest('Ошибка при валидации', errors.array()))
    return
  }

  next()
}

export default validateMiddleware
