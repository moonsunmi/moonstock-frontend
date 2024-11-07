import axios from 'axios'
import {useRouter} from 'next/navigation'

const axiosInstance = axios.create({
  baseURL: process.env.PUBLIC_NEXT_BACKEND_URL
})

if (typeof window !== 'undefined') {
  const accessToken = localStorage.getItem('accessToken')
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}
axiosInstance.defaults.headers.get['Content-Type'] = 'application/json'
axiosInstance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axiosInstance.defaults.withCredentials = true

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await axiosInstance.get('/api/auth/refresh-token')

        const accessToken = response.data?.accessToken
        localStorage.setItem('accessToken', accessToken)

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`

        return axiosInstance(originalRequest)
      } catch (error) {
        console.error('Refresh token request failed:', error)
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
