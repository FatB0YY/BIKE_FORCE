import $api from '../hooks/useHttp'

export default class AuthService {
  static async login(email, password) {
    const response = await $api.post('/user/login', { email, password })
    return response
  }
  static async registration(email, password, roles) {
    const response = await $api.post('/user/registration', {
      email,
      password,
      roles,
    })
    return response
  }
  static async logout() {
    const response = await $api.post('/user/logout')
    return response
  }
}
