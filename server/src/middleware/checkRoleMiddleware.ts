import { NextFunction, Response } from 'express'
import ApiError from '../error/ApiError.js'
import { IRequestWithUser, IUserAttributes, UserRoles } from '../models/IUser.js'
import UserDTO from '../dtos/userDto.js'
import tokenService from '../services/tokenService.js'
import pkg from 'jsonwebtoken'

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

      const accessToken: string = authorizationHeader.split(' ')[1]
      if (!accessToken) {
        return next(ApiError.jsonWebTokenError())
      }

      const user = tokenService.validateAccessToken(accessToken)
      if (!user || user instanceof pkg.JsonWebTokenError) {
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
