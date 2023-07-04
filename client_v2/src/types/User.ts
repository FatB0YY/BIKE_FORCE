export interface IUser {
  id: number
  email: string
  password?: string
  isActive: boolean
  isBan: boolean
  banReason: string
}
