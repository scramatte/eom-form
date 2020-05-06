import EomForm from './EomForm.vue'
import { forEach, upperFirst, camelCase } from 'lodash'

const components = {
  'EomForm' : EomForm
}

const fields = require.context(
  './fields', false, /Eom([\w-_]+)\.vue$/
)

forEach(fields.keys(), (key) => {
  const componentConfig = fields(key).default
  const componentName = upperFirst(
    camelCase(key.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  components[componentName] = componentConfig
})

export default components
