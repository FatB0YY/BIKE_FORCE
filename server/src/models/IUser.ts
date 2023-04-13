import { Request } from 'express'
import UserDTO from '../dtos/userDto.js'

export interface IUserAttributes {
  id: number
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
  isActive: boolean
  isBan: boolean
  banReason: string
}

export interface IRequestWithUser extends Request {
  user?: UserDTO
}

export enum UserRoleAdmin {
  ADMIN = 'ADMIN',
}
