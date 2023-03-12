import { IUserAttributes, UserRoles } from '../models/IUser'

class UserDTO {
  email: string
  id: number
  role: UserRoles

  constructor(model: IUserAttributes) {
    this.email = model.email
    this.id = model.id
    this.role = model.role
  }
}

export default UserDTO
