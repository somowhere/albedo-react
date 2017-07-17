import { request, config } from 'utils'

const { api } = config
const { dictModule } = api
const { select } = dictModule

export async function dictSelect (data) {
  return request({
    url: select,
    method: 'get',
    data,
  })
}
