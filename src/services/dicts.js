import { request, config } from 'utils'

const { api } = config
const { dict } = api

export async function queryAll (data) {
  return request({
    url: dict,
    method: 'get',
    data,
  })
}
