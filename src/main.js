import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue } from 'bootstrap-vue'

import i18n from './i18n'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { forEach, upperFirst, camelCase } from 'lodash'

let fields = require.context('./components/fields', false, /^\.\/Eom([\w-_]+)\.vue$/);

forEach(fields.keys(), (key) => {
  const componentConfig = fields(key).default
  const componentName = upperFirst(
    camelCase(key.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  Vue.component(componentName, componentConfig.default || componentConfig )
})

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
