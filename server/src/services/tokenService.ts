import * as dotenv from 'dotenv'
dotenv.config({ path: `.${process.env.NODE_ENV}.env` })
import jwt from 'jsonwebtoken'
import { Token } from '../models/models.js'
import UserDTO from '../dtos/userDto.js'

class TokenService {
  generateTokens(payload: UserDTO) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: '15m',
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: '30d',
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData: any = await Token.findOne({ where: { UserId: userId } })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await Token.create({ UserId: userId, refreshToken })
    return token
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.destroy({ where: { refreshToken } })
    return tokenData
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({ where: { refreshToken } })
    return tokenData
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!)
      return userData
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!)
      return userData
    } catch (error) {
      return null
    }
  }
}

export default new TokenService()
