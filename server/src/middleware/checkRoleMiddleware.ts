import { NextFunction, Response } from 'express'
import ApiError from '../error/ApiError.js'
import { IRequestWithUser, IUserAttributes } from '../models/IUser.js'
import UserDTO from '../dtos/userDto.js'
import tokenService from '../services/tokenService.js'
import pkg from 'jsonwebtoken'
import { Role, User } from '../models/models.js'
import { IRole } from '../models/IRole.js'

function checkRoleMiddleware(role: string) {
  return async function (req: IRequestWithUser, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      return next()
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

      // получаем user из бд
      const user = (await User.findOne({
        where: { id: userTokenData.id },
        include: [{ model: Role, where: { value: role } }],
      })) as any

      // проверяем есть ли пользователь
      if (!user) {
        return next(ApiError.forbiddenError())
      }

      // проверяем есть ли роли у пользователя
      if (user.Roles.length === 0) {
        return next(ApiError.forbiddenError())
      }

      // пользователь имеет хотя бы одну роль с заданным значением role
      const userRoles = user.Roles.map((role: IRole) => role.value)
      if (!userRoles.includes(role)) {
        return next(ApiError.forbiddenError())
      }

      // userDTO
      const userDto = new UserDTO(user)

      req.user = userDto
      next()
    } catch (error) {
      return next(ApiError.unauthorized())
    }
  }
}

export default checkRoleMiddleware
