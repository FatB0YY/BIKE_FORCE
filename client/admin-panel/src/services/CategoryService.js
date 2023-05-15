import $api from '../hooks/useHttp'

export default class CategoryService {
  static async postCategory(name) {
    return $api.post('/category', { name })
  }
  static async getCategory() {
    const response = await $api.get('/category')
    return response.data
  }
  static async putValue(page, id) {
    return $api.put(`/${page}/${id}`)
  }
}
