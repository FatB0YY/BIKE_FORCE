import $api from '../hooks/useHttp'

export default class CategoryService {
  static async postCategory(name) {
    const response = $api.post('/category', { name })
    return response
  }
  static async getCategory() {
    const response = await $api.get('/category')
    return response.data
  }
  static async putValue(page, id) {
    const response = await $api.put(`/${page}/${id}`)
    return response
  }
}
