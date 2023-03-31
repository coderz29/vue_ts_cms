import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系：path => component
  routes: [
    {
      // 默认进入的
      path: '/',
      // 重定向
      redirect: '/main'
    },
    {
      path: '/login',
      // 懒加载
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue'),
      children: []
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 动态的添加路由
router.addRoute

// 路由守卫
// 参数：to(要跳转到的位置)/from(从哪里跳转过来)
// 返回值；返回哪个路径，导航到哪个地方 （不返回或者返回undefined，默认跳转）
router.beforeEach((to) => {
  // 只有登录成功(获取到token)，才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  // 如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
