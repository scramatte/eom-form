<template>
  <b-col sm="12">
  <b-form-group :label="label" :invalid-feedback="error" :state="state">
     <multiselect
        :state="state"
        :value="value"
        @input="update($event)"
	:options="options.map(opt => opt.value)"
        :multiple="evalExpr(multiple)"
        :custom-label="opt => options.find(i => i.value == opt).text">
      </multiselect>
  </b-form-group>
  </b-col>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<!--style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style-->
<script>
import Multiselect from 'vue-multiselect'
import EomAbstract from './EomAbstract'

export default {
  inheritAttrs: false,
  mixins: [ EomAbstract ],
  components: {
    Multiselect
  },
  props: {
    value: {
      type: [Array, Object, String, Number]
    },
    multiple: {
      default: false
    },
    options: {
      type: Array,
      required: true
    }
  }
}
</script>
