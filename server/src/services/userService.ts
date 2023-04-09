import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import { User } from '../models/models.js'
import UserDTO from '../dtos/userDto.js'
import tokenService from './tokenService.js'
import { IUserAttributes, UserRoles } from '../models/IUser.js'

class UserService {
  async registration(email: string, password: string, role: UserRoles) {
    const userCandidate = await User.findOne({
      where: { email },
    })

    if (userCandidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password.toString(), salt)

    const user = (await User.create({
      email,
      password: hashPassword,
      role,
    })) as unknown as IUserAttributes

    const userDto = new UserDTO(user)

    const tokens = tokenService.generateTokens({
      ...userDto,
    })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async login(email: string, password: string) {
    // исправить тип
    const user = (await User.findOne({
      where: { email },
    })) as unknown as IUserAttributes

    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден')
    }

    const isPassEquals = await bcrypt.compare(password.toString(), user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль')
    }

    const userDto = new UserDTO(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.unauthorized()
    }
    const userData: any = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorized()
    }

    const user = await User.findByPk(userData.id)
    const userDto = new UserDTO(user as unknown as IUserAttributes)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto,
    }
  }

  async getAllUsers() {
    try {
      const users = await User.findAll()
      const dtoUsers = users.map((user: any) => new UserDTO(user))
      return dtoUsers
    } catch (error: any) {
      throw ApiError.internalError(error.message, error)
    }
  }
}

export default new UserService()
