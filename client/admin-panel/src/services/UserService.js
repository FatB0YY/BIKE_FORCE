import $api from "../hooks/useHttp"

export default class UserService {
    static fetchUser() {
        return $api.get('/users')
    }
}