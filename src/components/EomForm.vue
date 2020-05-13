<template>
    <b-row>
        <component
            v-for="field in parsedSchema"
            :key="field.model"
            :name="field.model"
            :validations="field.validations"
            :is="field.component"
            v-bind="binds(field)"
            :value="val(field)"
            @input="update(field.model, $event)"
        >
        <slot/>
        </component>
    </b-row>
</template>

<style>
.key {
  font-weight: bold;
  color: #02BC77;
}

</style>
<script>
import { isFunction, forEach } from 'lodash'

export default {
  props: {
    schema: {
      type: [Object, Array],
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    sharedConfig: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      form: {
      }
    }
  },
  watch: {
    value: function () {
      this.$nextTick(() => {
        // this.validate()
      })
    }
  },
  computed: {
    parsedSchema () {
      if (Array.isArray(this.schema)) return this.schema
      const arraySchema = []
      for (let model in this.schema) {
        arraySchema.push({
          ...this.schema[model],
          model
        })
      }
      return arraySchema
    },
    errorMessages () {
      return ['']
    }
  },
  methods: {
    prettyJSON: function (json) {
      if (json) {
        json = JSON.stringify(json, undefined, 4)
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
          var cls = 'number'
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key'
            } else {
              cls = 'string'
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean'
          } else if (/null/.test(match)) {
            cls = 'null'
          }
          return '<span class="' + cls + '">' + match + '</span>'
        })
      }
    },
    update (property, value) {
      this.$emit('input', {
        ...this.value,
        [property]: value
      })
    },
    binds (field) {
      return field.schema
        ? { schema: field.schema }
        : { ...this.sharedConfig, ...field }
    },
    val (field) {
      if (field.schema && !this.value[field.model]) {
        return {}
      }
      return this.value[field.model]
    },
    validate () {
      let valid = true
      forEach(this.$children, (child) => {
        if (isFunction(child.validate)) {
          let validation = child.validate()
          valid = valid && validation
        }
      })
      return valid
    }
  }
}
</script>
