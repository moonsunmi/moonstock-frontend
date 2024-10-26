'use client'

import {enqueueSnackbar} from 'notistack'
import axiosInstance from '../lib/axios'
import {useEffect} from 'react'
import {useRouter} from 'next/navigation'

const useAxiosInterceptor = () => {
  const router = useRouter()

  useEffect(() => {
    // todo. request: CSRF 공격 방지하기 위한 XSRF-token 확인
    const requestInterceptor = axiosInstance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`
          config.withCredentials = true
        }

        if (config.data instanceof FormData) {
          config.headers['Content-Type'] = 'multipart/form-data'
        } else {
          config.headers['Content-Type'] = 'application/json'
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    // response: JWT 토큰 만료 시, refresh 토큰 날릴 때 씀.
    const responseInterceptor = axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          try {
            // todo. refresh-token 무한 호출 발생했음. refresh를 다르게 해야 할듯...
            const response = await axiosInstance.post('/api/auth/refresh-token')

            const token = response.data.token
            localStorage.setItem('token', token)

            originalRequest.headers['Authorization'] = `Bearer ${token}`

            return axiosInstance(originalRequest)
          } catch (error) {
            console.error('Refresh token failed:', error)
            enqueueSnackbar(
              '리프레시 토큰이 만료되었습니다. 다시 로그인해 주세요.'
            )
            axiosInstance.post('/api/auth/logout')
            router.push('/login')
            return Promise.reject(error)
          }
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [])
}

export default useAxiosInterceptor

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
