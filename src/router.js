import Vue from 'vue'
import Router from 'vue-router'
import Chat from './components/Chat.vue'
import Login from './components/Login.vue'

import { validToken } from '../config/token'

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
      path: '/grupo/:room_id',
      name: 'ChatRoom',
      component: Chat
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})


router.beforeEach((to, from, next) => {
NProgress.start()
NProgress.set(0.1)
// console.log(to, from);
if (validToken() && to.name == 'Login') {
  // next(HomePage)
}
// faz validação de rota com validação de token e de usuário logado
  next()
// }
})

router.afterEach(() => {
  NProgress.set(0.9)
  setTimeout(() => NProgress.done(), 500)
})

export default router