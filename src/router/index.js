import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Basic from '../views/Basic.vue'
import Repeat from '../views/Repeat.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/basic',
    name: 'basic',
    component: Basic
  },
  {
    path: '/repeat',
    name: 'Repeat',
    component: Repeat
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
