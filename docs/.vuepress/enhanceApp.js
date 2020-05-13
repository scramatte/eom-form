import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import EomForm from  '../../src/components/index.js'

export default ({
  Vue,
}) => {
  Vue.use(BootstrapVue)
  Vue.use(EomForm)

}
