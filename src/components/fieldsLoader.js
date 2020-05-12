import { forEach, upperFirst, camelCase} from 'lodash'
 
let fieldComponents = {}

let coreFields = require.context(
  './fields', false, /Eom([\w-_]+)\.vue$/
)

forEach(coreFields.keys(), (key) => {
  let componentName = upperFirst(
    camelCase(key.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  fieldComponents[componentName] = coreFields(key).default
})

export default fieldComponents
