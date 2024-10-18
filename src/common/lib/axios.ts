import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // cookie 설정 시
})

// request: CSRF 공격 방지하기 위한 XSRF-token 확인
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response: JWT 토큰 만료 시, refresh 토큰 날릴 때 씀.
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const response = await axiosInstance.post('/api/auth/refresh-token')

      const token = response.data.token
      localStorage.setItem('token', token)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance

// 선임님 코드
// import axios from "axios";
// import setInterceptors from "./axiosInterceptor";

// function createInstance() {
//   const instance = axios.create({
//     headers: {
//       "Content-Type": "application/json",
//     },
//     withCredentials: true,
//   });

//   return setInterceptors(instance);
// }

// const axiosInstance = createInstance();

// export default axiosInstance;

// import { getAWSHeader } from "./aws";

// function setInterceptors(instance) {
//   instance.interceptors.request.use(
//     (config) => {
//       const AWSRegex = /amazonaws\.com\/media\/.*$/;
//       if (AWSRegex.test(config.url)) {
//         const S3File = config.url.match(/(\/media\/.*)$/)[1];
//         config.headers = getAWSHeader(S3File);
//       } else {
//         config.headers.Authorization = sessionStorage.getItem("tabID");
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
//   instance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
//   return instance;
// }

// export default setInterceptors;
