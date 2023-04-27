import $api from "../hooks/useHttp"

export default class RolesService {
    static getRoles() {
        return $api.get('/role')
    }
}