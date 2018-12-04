import { request } from 'utils/index';

export async function getList (params) {
  return request("/cosplay-gallery/list",{
    method: 'GET',
    body: params,
  })
}
