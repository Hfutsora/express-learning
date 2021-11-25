import request from '@/utils/request';

export function login(parameters: ApiParameters) {
  return request({
    method: 'post',
    url: '/user/login',
    data: parameters.data
  })
}
