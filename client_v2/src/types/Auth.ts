import { IRole } from './Role'
import { IUser } from './User'

export interface IAuthResponse {
  accessToken: string
  refreshToken: string
  user: IUser
}

export interface IPropsAuthReg {
  email: string
  password: string
  roles: IRole[]
}

export interface IPropsAuthLogin {
  email: string
  password: string
}
