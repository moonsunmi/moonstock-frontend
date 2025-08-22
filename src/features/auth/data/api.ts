import axiosInstance from '@/lib/axios'

export const authApi = {
  signup: payload =>
    axiosInstance.post('/api/auth/sign-up', payload, {withCredentials: false}),
  login: payload => axiosInstance.post('/api/auth/login', payload)
}
