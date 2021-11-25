import axios from 'axios';


const service = axios.create({
  baseURL: '/api',
  // 请求超时时间
  timeout: 50000,
  withCredentials: true
});



// request interceptor
service.interceptors.request.use(function(config) {
  // let accessToken = store.getters['user/accessToken'];

  // if (accessToken) {
  //   config.headers.Authorization = `Bearer ${accessToken}`;
  // }

  return config;
}, function(error) {
  return Promise.reject(error);
});

// response interceptor
service.interceptors.response.use(
  (response) => {
    localStorage.setItem('fromRootRouter', 'notRoot');

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
