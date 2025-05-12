import axios from 'axios'
import {readItemFromStorageP, writeItemFromStorageP} from '../utils'

const axiosInstance = axios.create({
  baseURL: process.env.PUBLIC_NEXT_BACKEND_URL,
  withCredentials: true
})

axiosInstance.defaults.headers.get['Content-Type'] = 'application/json'

axiosInstance.interceptors.request.use(async config => {
  if (typeof window !== 'undefined') {
    const accessToken = await readItemFromStorageP('accessToken')
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await axiosInstance.get('/api/auth/refresh-token')

        const accessToken = response.data?.accessToken
        writeItemFromStorageP('accessToken', accessToken)

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`

        return axiosInstance(originalRequest)
      } catch (error) {
        window.location.href = '/login'
        localStorage.removeItem('accessToken')
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
