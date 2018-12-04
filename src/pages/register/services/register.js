import { request } from 'utils/index';

export async function register (params) {
  return request("/ant-admin/register",{
    method: 'POST',
    body: params,
  })
}
