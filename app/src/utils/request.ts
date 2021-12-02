import Taro from '@tarojs/taro';

export default (
  options: {
    url: string;
    method: keyof Taro.request.method,
    params?: ApiParameters['qs'],
    data?: ApiParameters['body'],
  }
) => {
  const jwtToken = getAuthorizationToken();

  return Taro.request({
    url: 'http://127.0.0.1:3000' + options.url,
    data: {
      ...options.data,
      ...options.data
    },
    header: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken ? `bearer ${jwtToken}` : ''
    },
    method: options.method
  });
};

const AUTHORIZATION_TOKEN = 'APP_AUTHORIZATION_TOKEN';

export function setAuthorizationToken(token: string) {
  Taro.setStorageSync(AUTHORIZATION_TOKEN, token);
}

export function getAuthorizationToken() {
  return Taro.getStorageSync(AUTHORIZATION_TOKEN);
}
