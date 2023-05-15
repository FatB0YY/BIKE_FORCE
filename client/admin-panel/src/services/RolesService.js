import $api from '../hooks/useHttp'

export default class RolesService {
  static getRoles() {
    return $api.get('/role')
  }
  static setRole(value, description) {
    return $api.post('/role', { value, description })
  }
  static async getUserRoles(id) {
    const res = await $api.get(`/role/getUserRoles/?userId=${id} `)
    return res.data[0]
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
