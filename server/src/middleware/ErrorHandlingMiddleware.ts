import { Request, Response } from 'express'
import ApiError from '../error/ApiError'
import logger from '../logger'

function apiErrorHandler(err: unknown, req: Request, res: Response) {
  if (err instanceof ApiError) {
    logger.error(err)
    return res.status(err.status).json({ message: err.message })
  }

  // Обработка других ошибок
  if (err instanceof SyntaxError) {
    logger.error(err)
    return res.status(400).json({ message: 'Некорректный запрос' })
  }

  if (err instanceof TypeError) {
    logger.error(err)
    return res.status(400).json({ message: 'Некорректные параметры запроса' })
  }

  const errorMsg = `Непредвиденная ошибка: ${err}`
  logger.error(errorMsg, err)
  return res
    .status(500)
    .json({ message: 'Непредвиденная ошибка, повторите попытку позже.' })
}

export default apiErrorHandler