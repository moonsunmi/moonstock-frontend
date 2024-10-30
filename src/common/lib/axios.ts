import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.PUBLIC_NEXT_BACKEND_URL
})

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (
      originalRequest.url !== '/api/auth/login' &&
      originalRequest.url !== '/api/auth/refresh-token' &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        const response = await axiosInstance.post('/api/auth/refresh-token')

        const token = response.data.token
        localStorage.setItem('token', token)

        originalRequest.headers['Authorization'] = `Bearer ${token}`

        return axiosInstance(originalRequest)
      } catch (error) {
        console.error('Refresh token failed:', error)
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
