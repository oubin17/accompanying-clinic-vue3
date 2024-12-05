import { createRouter, createWebHashHistory } from 'vue-router'
import { id } from 'element-plus/es/locales.mjs'

import Layout from '../views/Main.vue'
import Login from '../views/login/index.vue'
import Admin from '../views/auth/admin/index.vue'
import Group from '../views/auth/group/index.vue'
import Order from '../views/vppz/order/index.vue'
import Staff from '../views/vppz/staff/index.vue'
import Dashboard from '../views/dashboard/index.vue'


const routes = [
  {
    path: '/',
    component: Layout,
    name: 'main',
    children: [
      {
        path: 'dashboard',
        meta: {
          id: '1',
          name: '控制台',
          icon: 'Platform',
          path: '/dashboard',
          describe: '用于展示当前系统中的统计数据、统计报表',
          code: 'CONSOLE_DESK'

        },
        component: Dashboard
      },
      {
        path: 'auth',
        meta: {
          id: '2',
          name: '权限管理',
          icon: 'Grid',
          code: 'RIGHTS'

        },
        children: [
          {
            path: 'admin',
            alias: ['admin'],
            meta: {
              id: '1',
              name: '账号管理',
              icon: 'Avatar',
              path: '/auth/admin',
              describe: '管理员可以进行编辑，权限修改后需要重新登录',
              code: 'ACCOUNT'
            },
            component: Admin

          },
          {
            path: 'group',
            meta: {
              id: '2',
              name: '菜单管理',
              icon: 'Menu',
              path: '/auth/group',
              describe: '菜单规则通常对应一个控制器方法',
              code: 'MENU'
            },
            component: Group
          }
        ]

      },
      {
        path: 'vppz',
        meta: {
          id: '3',
          name: 'DIDI陪诊',
          icon: 'BellFilled',
          code: 'DIDI'

        },
        children: [

          {
            path: 'order',
            alias: ['order'],
            meta: {
              id: '2',
              name: '陪护管理',
              icon: 'Odometer',
              path: '/vppz/order',
              describe: '陪护管理',
              code: 'ACCOMPANY'
            },
            component: Staff
          },
          {
            path: 'staff',
            alias: ['staff'],
            meta: {
              id: '1',
              name: '订单管理',
              icon: 'Location',
              path: '/vppz/staff',
              describe: '订单管理',
              code: 'ORDER'
            },
            component: Order
          }

        ]
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  //路由数据
  routes,
  //路由匹配模式
  history: createWebHashHistory()
})
export default router