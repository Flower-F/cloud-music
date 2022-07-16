import axios from 'axios'

import { BASE_REQUEST_URL } from '@/constants'

const axiosInstance = axios.create({
  baseURL: BASE_REQUEST_URL
})

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Toast.error('网络错误')
    return Promise.reject(new Error(error))
  }
)

export { axiosInstance as request }
