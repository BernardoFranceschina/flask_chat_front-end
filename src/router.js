import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './components/HomePage.vue'
import Chat from './components/Chat.vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(NProgress)
NProgress.configure({
  showSpinner: false
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/grupo/:room_id',
      name: 'ChatRoom',
      component: Chat
    }
  ]
})

// import { validToken } from '../../config/token'

router.beforeEach((to, from, next) => {
NProgress.start()
NProgress.set(0.1)
// faz validação de rota com validação de token e de usuário logado
  next()
// }
})

router.afterEach(() => {
  NProgress.set(0.9)
  setTimeout(() => NProgress.done(), 500)
})

export default router