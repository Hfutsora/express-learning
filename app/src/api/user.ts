import { request } from "@tarojs/taro";

export function login(parameters: ApiParameters) {
  return request({
    method: 'POST',
    url: 'http://127.0.0.1:3000/user/login',
    data: parameters.body,
  })
}
