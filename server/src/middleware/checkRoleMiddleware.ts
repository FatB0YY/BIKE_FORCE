import { NextFunction, Response } from 'express'
import ApiError from '../error/ApiError'
import { IRequestWithUser, IUserAttributes, UserRoles } from '../models/IUser'
import UserDTO from '../dtos/userDto'
import tokenService from '../services/tokenService'
import { JsonWebTokenError } from 'jsonwebtoken'

function checkRoleMiddleware(role: UserRoles) {
  return function (req: IRequestWithUser, res: Response, next: NextFunction) {
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

      if ((user as IUserAttributes).role !== role) {
        return next(ApiError.forbiddenError())
      }

      const userDto = new UserDTO(user as IUserAttributes)
      req.user = userDto

      next()
    } catch (error) {
      return next(ApiError.unauthorized())
    }
  }
}

export default checkRoleMiddleware
