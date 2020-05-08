import axios from 'axios'
import cf from './config'
import Qs from 'qs' // 必须引入这个处理post参数不然后端接收不到
import session from './extend/session'
import log from './extend/log'

function apiAxios (method, url, params, resolve, reject) {
    params = params || {}
    url = url || ''
    // eslint-disable-next-line
    let _key = method + url.replace(/\/|\?|=|\.|\&/g, '')
    // 阻止联系点击
    if (isDouble(_key, params)) {
        reject({ code: -1, msg: '提交中' })
    } else {
        hash[_key] = params
        axios({
            method: method == 'POSTJSON' ? 'POST' : method,
            url: url,
            data: (method === 'POST' || method === 'PUT') ? Qs.stringify(params) : null,
            params: (method === 'POSTJSON' || method === 'GET' || method === 'DELETE') ? params : null,
            baseURL: api.baseURL,
            withCredentials: false,
            headers: {
                'token': session.get('token'),
                'Content-Type': (method === 'POST' || method === 'PUT') ? 'application/x-www-form-urlencoded' : 'application/json'
            }
        })
            .then(res => {
                delHash(_key, params)
                log('__________________________________________________')
                log('请求方法：' + method)
                log('请求链接：' + api.baseURL + url)
                log('请求参数：' + JSON.stringify(params))
                log(JSON.stringify(res.data))
                log('__________________________________________________')
                if (api.loginCode.indexOf(res.data.code) != -1) {
                    window.location.href = '#/login'
                } else if (api.succCode.indexOf(res.data.code) != -1) {
                    resolve(res.data)
                } else {
                    reject(res.data)
                }
            }, err => {
                delHash(_key, params)
                reject({ code: -404, msg: err.message || '系统开小差' })
            })
    }
}
/**
 * 处理多次操作
 */
let hash = {}
const isDouble = (key, value) => {
    let _bl = false
    for (let o in hash) {
        if (o == key && hash[o] && JSON.stringify(hash[o]) == JSON.stringify(value)) {
            _bl = true
            break
        }
    }
    return _bl
}
const delHash = (key, value) => {
    if (hash[key] && JSON.stringify(hash[key]) == JSON.stringify(value)) delete hash[key]
}
let api = {
    get: (url, params) => {
        return new Promise((resolve, reject) => {
            apiAxios('GET', url, params, resolve, reject)
        })
    },
    post: (url, params) => {
        return new Promise((resolve, reject) => {
            apiAxios('POST', url, params, resolve, reject)
        })
    },
    postJson: (url, params) => {
        return new Promise((resolve, reject) => {
            apiAxios('POSTJSON', url, params, resolve, reject)
        })
    },
    put: (url, params) => {
        return new Promise((resolve, reject) => {
            apiAxios('PUT', url, params, resolve, reject)
        })
    },
    del: (url, params) => {
        return new Promise((resolve, reject) => {
            apiAxios('DELETE', url, params, resolve, reject)
        })
    },
    upload (url, file, progress) {
        var form = new FormData()
        form.append('file', file)
        form.append('name', file.name)

        var config = {
            baseURL: api.baseURL,
            onUploadProgress: progressEvent => {
                var _complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                progress && progress(_complete)
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(
                url,
                form,
                config
            ).then(res => {
                resolve(res.data)
            })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
// 把config的字段合并为api的一部分
Object.assign(api, cf)

export default api
