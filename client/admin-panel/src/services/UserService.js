import $api from '../hooks/useHttp'

export default class UserService {
  static async getUsers() {
    const response = await $api.get('/user/users')
    return response.data
  }
}
