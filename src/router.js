import { createRouter, createWebHistory } from 'vue-router'

import vuex from './store'

import AllMessages from './components/AllMessages.vue'
import AppMessage from './components/AppMessage.vue'

const routes = [
  { path: '/', component: AllMessages, name: '/' },
  { path: '/message', component: AppMessage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/message' && !vuex.getters.currentMessage)
    return next({ path: '/' })
  next()
})

export default router
