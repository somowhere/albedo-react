import config from './config'
import request from './request'
import classnames from 'classnames'
import { color } from './theme'
import lodash from 'lodash'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * 表单search对象
 * @param   {Object}     fields
 * @return  {Object}
 */
const parseJsonItemForm = (fields) => {
  let data = lodash.cloneDeep(fields)
  let result = []
  let hash = {
    format: null,
    fieldName: null,
    attrType: 'String',
    fieldNode: null,
    weight: 0,
    operate: 'like',
    analytiColumn: true,
    analytiColumnPrefix: null,
    endValue: null,
    value: null,
  }
  Object.keys(data).map((name, index) => {
    const temp = data[name];
    if(temp && temp.value) {
      let itemTemp = lodash.cloneDeep(hash);

      Object.keys(temp).map((nameTemp, index) => {
        const itemValue = temp[nameTemp];
        if(itemValue != null && itemValue != undefined) {
          itemTemp[nameTemp] = temp[nameTemp];
        }
      })
      if(itemTemp.attrType=='Date'&& !itemTemp.format){
        itemTemp.format = 'yyyy-MM-dd HH:mm:ss'
      }
      result.push(itemTemp);
    }
  })
  return {queryConditionJson:JSON.stringify(result)};
}


module.exports = {
  config,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  parseJsonItemForm,
}
