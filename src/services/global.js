import { request } from 'utils/index';

export async function getBaseData (params = {}) {
  return request("/tbk/item/getBaseData",{
    method: 'GET',
    body: params,
  })
}

export async function getList (params = {}) {
  return request("/tbk/item/list",{
    method: 'GET',
    body: params,
  })
}
