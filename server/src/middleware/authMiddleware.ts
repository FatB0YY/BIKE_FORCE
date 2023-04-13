import { NextFunction, Response } from 'express'
import pkg from 'jsonwebtoken'
import UserDTO from '../dtos/userDto.js'
import ApiError from '../error/ApiError.js'
import { IRequestWithUser, IUserAttributes } from '../models/IUser.js'
import tokenService from '../services/tokenService.js'

function authCheckMiddleware(req: IRequestWithUser, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    // получаем Header Authorization
    const authorizationHeader: string | undefined = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.unauthorized())
    }

    // проверяем тип токена
    const bearer: string = authorizationHeader.split(' ')[0]
    if (bearer !== 'Bearer') {
      return next(ApiError.forbiddenError())
    }

    // проверяем есть ли там токен
    const accessToken: string = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.jsonWebTokenError())
    }

    // получаем данные из токена
    const userTokenData: any = tokenService.validateAccessToken(accessToken)

    // проверяем есть ли данные
    if (!userTokenData) {
      return next(ApiError.forbiddenError())
    }

    // проверяем токен
    if (userTokenData instanceof pkg.JsonWebTokenError) {
      return next(ApiError.jsonWebTokenError())
    }

    const userDto = new UserDTO(userTokenData as IUserAttributes)
    req.user = userDto
    next()
  } catch (error: any) {
    return next(ApiError.internalError(error.message, error))
  }
}

export default authCheckMiddleware
