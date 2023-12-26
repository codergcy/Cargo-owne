import axios from 'axios'
import store from '@/store'
// import { Message } from 'element-ui'
// import router from '@/router/router'
// 创建 axios 实例
const service = axios.create({
  baseURL: '/jeecg-boot', // api base_url
  timeout: 60 * 1000 * 10 // 请求超时时间
})
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers['X-Access-Token'] = store.getters.token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  if (config.method == 'get' && config.url) {
    if (config.url.indexOf("sys/dict/getDictItems") < 0) {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
  } else {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
  }
  return config
}, (error) => {
  // 失败执行promise
  return Promise.reject(error)
})

export default service