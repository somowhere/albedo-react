import { request, config } from 'utils'
import querystring from 'querystring'
const { api } = config
const { dictModule } = api
const { select } = dictModule

export async function dictSelect (data) {

  // paramsSerializer: function(params) {
  //   return Qs.stringify(params, {arrayFormat: 'brackets'})
  // },

  return request({
    url: select,
    method: 'get',
    data,
  })
}
