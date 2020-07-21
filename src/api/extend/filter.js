
import Vue from 'vue'
// 接口字段有可能出现3种情况
// undefined(要的字段没有返回)
// null(数据不存在)
// 空字符串(可能人为设置)

const isInvalid = (val) => {
    if (val === undefined || val === null || isNaN(val) || val === '') {
        return true
    }
    return false
}
/**
 * 千分位
 * 只对数字有效
 */
const kNumFmt = (val) => {
    if (isInvalid(val)) {
        return val
    }
    var _splitAr = val.toString().split('.')
    var _intPart = _splitAr[0] // 获取整数部分
    _intPart = _intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
    var _floatPart = '' // 预定义小数部分
    // =2表示数据有小数位
    if (_splitAr.length == 2) {
        _floatPart = '.' + _splitAr[1]
    }
    return _intPart + _floatPart
}
/**
 * 在项目中对无值字段的处理方式
 */
const nullFmt = (val, unit, flag) => {
    flag = flag || '--'
    unit = unit || ''
    if (isInvalid(val)) {
        return flag
    } else {
        return val + unit
    }
}
/**
 * 数字小数点个数
 * 只支持数字
 */
const numFloadtCount = (val, floatCount = 2, zeroLimit) => {
    if (isInvalid(val)) {
        return val
    }
    if (zeroLimit && val === 0) {
        return val
    }
    return Number(val).toFixed(floatCount)
}
/**
 * 数字类型：亿 万
 */
const numFmt = (num, floatCount) => {
    num = Number(num) || 0
    var _num = num
    var _tag = ''

    if (num >= 100000000) {
        _tag = '亿'
        _num = num / 100000000
    } else if (num >= 10000) {
        _tag = '万'
        _num = num / 10000
    } else {
        _num = num
    }
    return floatCount == undefined ? _tag : _num.toFixed(floatCount)
}
/**
 * 对字节的转换处理
 */
const bytesToSize = (bytes, floatCount) => {
    bytes = parseInt(bytes)
    if (bytes === 0) return '0 B'
    var _k = 1024
    var _sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    var _i = Math.floor(Math.log(bytes) / Math.log(_k))
    var _m = bytes / Math.pow(_k, _i)
    switch (_i) {
        case 0:
        case 1:
            _m = (floatCount == undefined ? _m.toFixed(0) : _m.toFixed(floatCount)) + _sizes[_i]
            break
        default:
            _m = (floatCount == undefined ? _m.toFixed(2) : _m.toFixed(floatCount)) + _sizes[_i]
            break
    }
    return _m
}

const API = {
    kNumFmt,
    nullFmt,
    numFloadtCount,
    numFmt,
    bytesToSize
}
Object.keys(API).forEach(key => {
    Vue.filter(key, API[key])
})
export default API
