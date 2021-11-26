import Taro from '@tarojs/taro';

export default (
  options: {
    url: string;
    method: keyof Taro.request.method,
    params?: ApiParameters['qs'],
    data?: ApiParameters['body'],
  }
) => {
  return Taro.request({
    url: 'http://127.0.0.1:3000' + options.url,
    data: {
      ...options.data,
      ...options.data
    },
    header: {
      'Content-Type': 'application/json'
    },
    method: options.method
  })
};
