import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { WFRequestConfig } from './type'

// 拦截器：蒙版Loading/token/修改配置

/**
 * 两个难点：
 *  1. 拦截器进行精细控制
 *       全局拦截器
 *       实例拦截器
 *       单次请求拦截器
 *  2. 响应结果的类型处理（泛型）
 */

class WFRequest {
  instance: AxiosInstance

  // request实例 => axios实例
  constructor(config: WFRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    // request.use(fn1, fn2) fn1:请求成功，fn2：请求失败
    // response.use(fn1, fn2) fn1:响应成功，fn2：响应失败
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        // console.log('全局请求失败的拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局响应成功的拦截')
        return res.data
      },
      (err) => {
        // console.log('全局响应失败的拦截')
        return err
      }
    )

    // 针对特定的WFRequest实例添加拦截
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailureFn
      )
      this.instance.interceptors.response.use(
        config.interceptors.responseSuccessFn,
        config.interceptors.responseFailureFn
      )
    }
  }

  // 封装网络请求的方法
  request<T = any>(config: WFRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // return this.instance.request(config)
    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: WFRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: WFRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: WFRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: WFRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default WFRequest
