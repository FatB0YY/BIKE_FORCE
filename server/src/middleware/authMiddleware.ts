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
    const authorizationHeader: string | undefined = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.unauthorized())
    }

    const accessToken: string = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.jsonWebTokenError())
    }

    const user = tokenService.validateAccessToken(accessToken)
    if (!user || user instanceof pkg.JsonWebTokenError) {
      return next(ApiError.jsonWebTokenError())
    }

    const userDto = new UserDTO(user as IUserAttributes)
    req.user = userDto
    next()
  } catch (error: any) {
    return next(ApiError.internalError(error.message, error))
  }
}

export default authCheckMiddleware
