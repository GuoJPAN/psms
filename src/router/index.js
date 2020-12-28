import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '@/components/common/base/Home.vue'),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/index',
          component: () => import('@/components/view/index/index'),
          meta: { title: '首页' }
        },
        {
          path: '/sysOnline',
          component: () => import('@/components/view/systemOnline/sysOnlineIndex'),
          meta: { title: '需求管理' }
        },
        {
          path: '/codeScan',
          component: () => import('@/components/view/systemOnline/codeScan'),
          meta: { title: '代码扫描' }
        },
        {
          path: '/docIndex',
          component: () => import('@/components/view/doc/docIndex'),
          meta: { title: 'tab页echarts' }
        },
        {
          path: '/myBoard',
          component: () => import('@/components/view/doc/myBoard'),
          meta: { title: '看板' }
        },
        {
          path: '/test',
          component: () => import('@/components/view/test'),
          meta: { title: '调试调试' }
        },
        {
          path: '/test001',
          component: () => import('@/components/view/rain'),
          meta: { title: '爷爷' }
        },
        {
          path: '/table',
          component: () => import('@/components/view/table'),
          meta: { title: '表格' }
        },
        {
          path: '/icon',
          component: () => import('@/components/view/table/icon.vue'),
          meta: { title: '表格' }
        }
      ]
    }
  ]
})
