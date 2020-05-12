import component from './EomForm.vue'
import fieldComponents from './fieldsLoader.js'

export default {
  component,
  fieldComponents,
  install(Vue, options) {
    if (options) {
      console.warn(options)
    }

    Vue.component("EomForm", component)

    Object.keys(fieldComponents).forEach(name => {
      Vue.component(name, fieldComponents[name])
    })
  }
}

