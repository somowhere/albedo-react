import { request, config } from 'utils'
import querystring from 'querystring'

const { api } = config
const { userLogin } = api

export async function login (data) {
  var config = {headers: {
    'Content-Type' : 'application/x-www-form-urlencoded'
  }};
  data = querystring.stringify(data)
  return request({
    url: userLogin,
    method: 'post',
    data,
    config,
  })
}
