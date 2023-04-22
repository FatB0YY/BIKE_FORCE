import { NextFunction, Request, Response } from 'express'
import logger from '../logger/index.js'
import ApiError from './ApiError.js'

function apiErrorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  // запись в журнал
  if (Array.isArray(err) && err.length) {
    err.forEach((error: unknown) => {
      logger.error(error)
    })
  } else {
    logger.error(err)
  }

  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, errors: err.errors })
    return
  }

  // Обработка других ошибок
  if (err instanceof SyntaxError) {
    res.status(400).json({ message: 'Некорректный запрос' })
    return
  }

  if (err instanceof TypeError) {
    res.status(400).json({ message: 'Некорректные параметры запроса' })
    return
  }

  res.status(500).json({ message: 'Непредвиденная ошибка, повторите попытку позже.' })
}

export default apiErrorHandler
