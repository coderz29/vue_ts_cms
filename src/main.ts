import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import registerIcon from './global/register-icon'
import useLoginStore from './store/login/login'

// 针对ElMessage和 ElLoading等组件引入样式
// import 'element-plus/theme-chalk/el-message.css'

// 图标的全局引用

const app = createApp(App)
app.use(registerIcon)
app.use(pinia)
const loginStore = useLoginStore()
loginStore.loadLocalCacheAction()
app.use(router)
app.mount('#app')
