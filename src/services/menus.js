import { request, config } from 'utils'
const { api } = config
const { moduleModule } = api
const { menu } = moduleModule

export async function query (params) {
  return request({
    url: menu,
    method: 'get',
    data: params,
  })
}
