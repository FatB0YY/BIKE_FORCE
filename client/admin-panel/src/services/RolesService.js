import $api from '../hooks/useHttp'

export default class RolesService {
  static getRoles() {
    return $api.get('/role')
  }
  static async setRole(value, description) {
    const response = await $api.post('/role', { value, description })
    return response
  }
  static async getUserRoles(id) {
    const res = await $api.get(`/role/getUserRoles/?userId=${id} `)
    return res.data
  }
  static async addUserRoles(userId, roles) {
    const res = await $api.post(`/role/addRole`, { userId, roles })
    return res
  }
  static async getOneRol(value) {
    const res = await $api.get(`/role/getOne?value=${value}`)
    return res.data
  }
}
