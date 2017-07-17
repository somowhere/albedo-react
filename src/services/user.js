import { request, config } from 'utils'
const { api } = config
const { userModule } = api
const { user, query, remove, lock } = userModule

export async function page (params) {
  return request({
    url: user,
    method: 'get',
    data: params,
  })
}

export async function info (params) {
  return request({
    url: query,
    method: 'get',
    data: params,
  })
}

export async function save (params) {
  return request({
    url: user,
    method: 'post',
    data: params,
  })
}

export async function doLock (params) {
  return request({
    url: lock,
    method: 'post',
    data: params,
  })
}

export async function doRemove (params) {
  return request({
    url: remove,
    method: 'delete',
    data: params,
  })
}

