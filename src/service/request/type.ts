// import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 针对AxiosRequestConfig配置进行扩展
export interface WFInterceptor<T = AxiosResponse> {
  requestSuccessFn?: (config: any) => any
  // 这个不知道为啥不行
  // requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
export interface WFRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: WFInterceptor<T>
}
