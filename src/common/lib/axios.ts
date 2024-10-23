import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // cookie 설정 시
})

export default axiosInstance
