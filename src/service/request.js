import axios from 'axios'
import { BASE_URL } from './config'

export function request(url, params) {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    withCredentials: true
  })

  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(
    config => {
      // console.log('请求拦截器');
      if (localStorage.getItem('token')) {
        // config.headers.common['token'] = localStorage.getItem('token')
      }
      return config
    },
    err => {
      console.log(err)
    }
  )
  // 响应拦截
  instance.interceptors.response.use(
    config => {
      return config
    },
    err => {
      console.log([err])
    }
  )

  instance.defaults.withCredentials = true
  // get请求
  if (params) {
    params = {
      params: params
    }
    return instance.get(url, params)
  } else {
    return instance.get(url)
  }
}
