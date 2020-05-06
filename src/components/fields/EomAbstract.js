import { get as objGet, isFunction, isString, forEach } from 'lodash'
import Validators from '../../utils/validators'
import { compile } from 'expression-eval'

function attributesDirective (el, binding, vnode) {
  let attrs = objGet(vnode.context, 'schema.attributes', {})
  let container = binding.value || 'input'
  if (isString(container)) {
    attrs = objGet(attrs, container) || attrs
  }
  forEach(attrs, (val, key) => {
    el.setAttribute(key, val)
  })
}

export default {
  props: {
    value: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean
    },
    readOnly: {
      type: [String, Boolean]
    },
    validations: {
      type: [Array, Object]
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    help: {
      type: String,
      required: false
    },
    size: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    }
  },
  directives: {
    attributes: {
      bind: attributesDirective,
      updated: attributesDirective,
      componentUpdated: attributesDirective
    }
  },
  computed: {
    state () {
      return (this.errors.length === 0)
    },
    error () {
      return this.errors.join(', ')
    }
  },
  data () {
    return {
      errors: [],
      toggleHelp: false
    }
  },
  methods: {
    evalExpr (expr) {
      if (isString(expr)) {
        const fn = compile(expr)
        return fn(this)
      }
    },
    update (value) {
      this.$emit('input', value)
    },
    clearValidationsErrors () {
      this.errors = []
    },
    validate () {
      if (!this.validations) return true

      this.clearValidationsErrors()
      console.warn('validators:', Object.keys(this.validations))

      forEach(this.validations, (options, name) => {
        let validator = Validators[name]
        // console.warn('validator:', name)

        if (isFunction(validator)) {
          let error = validator.call(this, this.value, options)
          if (error) {
            this.errors.push(error)
          }
        } else {
          console.warn('unknown validator:', name)
        }
      })

      return (this.errors.length === 0)
    }
  }
}
