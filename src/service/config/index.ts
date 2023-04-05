// export const BASE_URL = 'http://codercba.com:8000'

// 代码逻辑判断，判断当前环境
// vite 默认提供的环境变量
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV)  //是否开发环境
// console.log(import.meta.env.PROD)  // 是否生产环境
// console.log(import.meta.env.SSR)  //是否服务端渲染（server side render）

let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  // BASE_URL = 'http://152.136.185.210:4000'
  BASE_URL = 'http://codercba.com:5000'
} else {
  // 开发环境
  BASE_URL = 'http://123.207.32.32:5000'
}

export const TIME_OUT = 10000
export { BASE_URL }
