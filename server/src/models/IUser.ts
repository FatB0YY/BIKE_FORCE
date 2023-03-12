import { Request } from 'express'
import UserDTO from '../dtos/userDto'

export interface IUserAttributes {
  id: number
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
  role: UserRoles
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

export interface IRequestWithUser extends Request {
  user?: UserDTO
}
