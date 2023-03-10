import { Request, Response } from 'express'
import ApiError from '../error/ApiError'

function apiErrorHandler(err: Error, req: Request, res: Response) {
  // Логирование ошибок
  console.error(err)

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }

  // Обработка других ошибок
  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: 'Некорректный запрос' })
  }

  if (err instanceof TypeError) {
    return res.status(400).json({ message: 'Некорректные параметры запроса' })
  }

  return res
    .status(500)
    .json({ message: 'Непредвиденная ошибка, повторите попытку позже.' })
}

export default apiErrorHandler
