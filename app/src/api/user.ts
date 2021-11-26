import request from "@/utils/request"

export function login(parameters: ApiParameters) {
  return request({
    method: 'POST',
    url: '/user/login',
    data: parameters.body,
  })
}
