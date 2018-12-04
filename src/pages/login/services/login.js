import { request } from 'utils/index';

export async function login (params) {
  return request("/ant-admin/login",{
    method: 'POST',
    body: params,
  })
}
