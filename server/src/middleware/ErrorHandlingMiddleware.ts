import { Request, Response } from 'express'
import ApiError from '../error/ApiError'

function apiErrorHandler(err: unknown, req: Request, res: Response) {
  console.log('ERROR!', err)

  if (err instanceof ApiError) {
    // сюда лог
    return res.status(err.status).json({ message: err.message })
  }

  // Обработка других ошибок
  if (err instanceof SyntaxError) {
    // сюда лог
    return res.status(400).json({ message: 'Некорректный запрос' })
  }

  if (err instanceof TypeError) {
    // сюда лог
    return res.status(400).json({ message: 'Некорректные параметры запроса' })
  }

  // сюда лог
  return res
    .status(500)
    .json({ message: 'Непредвиденная ошибка, повторите попытку позже.' })
}

export default apiErrorHandler
