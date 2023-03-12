import jsonwebtoken from 'jsonwebtoken'
import UserDTO from '../dtos/userDto'

class TokenService {
  generateToken(payload: UserDTO) {
    const token = jsonwebtoken.sign(payload, process.env.SECRET_KEY!, {
      expiresIn: '15m',
    })

    return token
  }

  validateToken(token: string) {
    try {
      const userData = jsonwebtoken.verify(token, process.env.SECRET_KEY!)
      return userData
    } catch (error) {
      throw error
    }
  }
}

export default new TokenService()
