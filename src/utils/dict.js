import { request, config } from 'utils'
import * as dictsService from '../services/dicts'

const { userLogin } = api
/*
    ## 系统 字典数据
    字典数据来源 后台存储


    **排序**

    ```js
    var map = {}
    _.each(_.keys(REGIONS),function(id){
      map[id] = REGIONS[ID]
    })
    JSON.stringify(map)
    ```
*/

// id pid/parentId name children
const tree = (list) => {
  let mapped = {}
  let item
  for (let i = 0; i < list.length; i++) {
    item = list[i]
    if (!item || !item.id) continue
    mapped[item.id] = item
  }

  let result = []
  for (let ii = 0; ii < list.length; ii++) {
    item = list[ii]

    if (!item) continue
            /* jshint -W041 */
    if (item.pid === undefined && item.parentId === undefined) {
      result.push(item)
      continue
    }
    let parent = mapped[item.pid] || mapped[item.parentId]
    if (!parent) continue
    if (!parent.children) parent.children = []
    parent.children.push(item)
  }
  return result
}

let  DICT_FIXED= (function () {
  let fixed = yield call(dictsService.queryAll,{type: 'menu', root: true})
  return fixed
}())

module.exports = DICT_FIXED
