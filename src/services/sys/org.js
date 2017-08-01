import { request, config } from 'utils'

const { api } = config
const { orgModule } = api
const { tree, org, query, remove, lock } = orgModule

export async function orgTree (data) {
  return request({
    url: tree,
    method: 'get',
    data,
  })
}
export async function page (params) {
  return request({
    url: org,
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
  var config = {headers: {
    'Content-Type' : 'application/json'
  }};
  params = JSON.stringify(params)
  return request({
    url: role,
    method: 'post',
    data: params,
    config,
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
    method: 'post',
    data: params,
  })
}


