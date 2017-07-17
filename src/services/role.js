import { request, config } from 'utils'

const { api } = config
const { roleModule } = api
const { select } = roleModule

export async function roleSelect (data) {
  return request({
    url: select,
    method: 'get',
    data,
  })
}
