import { request, config } from 'utils'
const { api } = config
const { moduleModule } = api
const { tree } = moduleModule

export async function query (params) {
  return request({
    url: tree,
    method: 'get',
    data: params,
  })
}
