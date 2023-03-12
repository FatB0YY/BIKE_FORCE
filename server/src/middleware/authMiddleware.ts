import { NextFunction, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import UserDTO from '../dtos/userDto'
import ApiError from '../error/ApiError'
import { IRequestWithUser, IUserAttributes } from '../models/IUser'
import tokenService from '../services/tokenService'

function authCheckMiddleware(
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const authorizationHeader: string | undefined = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.unauthorized())
    }

    const token: string = authorizationHeader.split(' ')[1]
    if (!token) {
      return next(ApiError.jsonWebTokenError())
    }

    const user = tokenService.validateToken(token)
    if (!user || user instanceof JsonWebTokenError) {
      return next(ApiError.jsonWebTokenError())
    }

    const userDto = new UserDTO(user as IUserAttributes)
    req.user = userDto
    next()
  } catch (error) {
    return next(ApiError.internalError(error))
  }
}

export default authCheckMiddleware
