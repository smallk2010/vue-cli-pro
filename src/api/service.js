import api from './index'
export const login = (params) => {
    return api.post('/example/login', params)
}
export const home = (params) => {
    return api.get('/example/home', params)
}
