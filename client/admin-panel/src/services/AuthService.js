import $api from "../hooks/useHttp"

export default class AuthService {
    static async login(email, password) {
        return $api.post('/user/login', {email, password})
    }
    static async registration(email, password, roles) {
        return $api.post('/user/registration', {email, password, roles})
    }
    static async logout() {
        return $api.post('/user/logout')
    }
}

