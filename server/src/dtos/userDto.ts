import { IUserAttributes } from '../models/IUser.js'

class UserDTO {
  email: string
  id: number
  isActive: boolean
  isBan: boolean
  banReason: string

  constructor(model: IUserAttributes) {
    this.email = model.email
    this.id = model.id
    this.banReason = model.banReason
    this.isActive = model.isActive
    this.isBan = model.isBan
  }
}

export default UserDTO
