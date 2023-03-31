import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import WFRequest from './request'

const wfRequest = new WFRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 拦截器
    requestSuccessFn(config) {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = token
      }
      return config
    }
  }
})

export default wfRequest
