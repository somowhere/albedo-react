import { request, config } from 'utils'

const { api } = config
const { orgModule } = api
const { tree } = orgModule

export async function orgTree (data) {
  return request({
    url: tree,
    method: 'get',
    data,
  })
}
