import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

/**
 * 路由表
 */
const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'homepage',
    redirect: '/index',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
