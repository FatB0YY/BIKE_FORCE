import ApiError from '../error/ApiError'
import bcrypt from 'bcrypt'
import { User } from '../models/models'
import UserDTO from '../dtos/userDto'
import tokenService from './tokenService'
import { IUserAttributes, UserRoles } from '../models/IUser'

class UserService {
  async registration(email: string, password: string, role: UserRoles) {
    const userCandidate = await User.findOne({
      where: { email },
    })

    if (userCandidate) {
      throw ApiError.badRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      )
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password.toString(), salt)

    const user = (await User.create({
      email,
      password: hashPassword,
      role,
    })) as unknown as IUserAttributes

    const userDto = new UserDTO(user)

    const token = tokenService.generateToken({
      ...userDto,
    })

    return {
      token,
      user: userDto,
    }
  }

  async login(email: string, password: string) {
    // исправить тип
    const user = (await User.findOne({
      where: { email },
    })) as unknown as IUserAttributes

    if (!user) {
      throw ApiError.badRequest('Пользователь не найден')
    }

    const isPassEquals = await bcrypt.compare(
      password.toString(),
      user.password
    )
    if (!isPassEquals) {
      throw ApiError.badRequest('Неверный пароль')
    }

    const userDto = new UserDTO(user)
    const token = tokenService.generateToken({ ...userDto })

    return {
      token,
      user: userDto,
    }
  }
}

export default new UserService()
