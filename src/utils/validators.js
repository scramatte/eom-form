import i18n from '@/i18n'
import { isArray, isNil } from 'lodash'
import { compile } from 'expression-eval'

function isEmpty (value, required) {
  if (isNil(value) || value === '') {
    if (required) {
      return i18n.tc('field_is_required')
    } else {
      return ''
    }
  }
  return null
}

export default {
  required: function (value) {
    if ((isArray(value) && value.length === 0) || isNil(value) || value === '') {
      return i18n.tc('field_is_required')
    }
  },
  minLength: function (value, options) {
    if (value && (value.length < options.min)) {
      return i18n.tc('too_short')
    }
  },
  alpha: function (value, field) {
    let res = isEmpty(value, field.required)
    if (res != null) return res

    let re = /^[a-zA-Z]*$/
    if (!re.test(value)) {
      return i18n.tc('invalid_alpha', value)
    }
  },
  alphaNumeric: function (value, field) {
    let res = isEmpty(value, field.required)
    if (res != null) return res

    let re = /^[a-zA-Z0-9]*$/
    if (!re.test(value)) {
      return i18n.tc('invalid_alpha_numeric', value)
    }
  },
  email: function (value, field) {
    let res = isEmpty(value, field.required)
    if (res != null) return res

    let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!re.test(value)) {
      return i18n.tc('invalid_email', value)
    }
  },
  alphaNum: function (value) {
    if (value) {
      return i18n.tc('not_alphanumeric', value)
    }
  },
  sameAs: function (value, options) {
    if (options.expr) {
      const fn = compile(options.expr)
      if (fn(this) !== value) {
        return i18n.tc('not_the_same_as', value)
      }
    }
  }
}
