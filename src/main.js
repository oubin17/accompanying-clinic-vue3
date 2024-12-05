import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import PanelHead from './components/panelHead.vue'

const app = createApp(App)
const pinia = createPinia()

//导入el-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//路由守卫，如果没有token，不允许进入
router.beforeEach((to, from) => {
  const odkToken = localStorage.getItem('odk-token')
  //非登录，注册页面token不存在
  if (!odkToken && to.path !== '/login') {
    return '/login'
  } else if (odkToken && to.path === '/login') {
    return '/'
  } else {
    return true
  }
})

//组件全局注入
app.component('PanelHead', PanelHead)
//路由挂载
app.use(router)
app.use(pinia)

app.mount('#app')
