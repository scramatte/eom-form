import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Minimal from '../views/Minimal.vue'
import Basic from '../views/Basic.vue'
import Select from '../views/Select.vue'

import Repeat from '../views/Repeat.vue'
import More from '../views/More.vue'
import Upload from '../views/Upload.vue'
import Editor from '../views/Editor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/minimal',
    name: 'minimal',
    component: Minimal
  },
  {
    path: '/basic',
    name: 'basic',
    component: Basic
  },
  {
    path: '/select',
    name: 'select',
    component: Select
  },
  {
    path: '/repeat',
    name: 'repeat',
    component: Repeat
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload
  },
  {
    path: '/more',
    name: 'more',
    component: More
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
