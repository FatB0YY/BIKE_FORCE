import { NextFunction, Request, Response } from 'express'
import ApiError from './ApiError.js'
import { validationResult } from 'express-validator'

function validateRequestSchema(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    next(ApiError.badValidation(errors.array()))
    return
  }

  next()
}

export default validateRequestSchema
