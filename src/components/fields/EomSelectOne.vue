<template>
  <b-col sm="12">
  <b-form-group :label="label" :invalid-feedback="error" :state="state">
  <multiselect
    :value="value"
    @input="$emit('input', $event)"
    :options="options.map(opt => opt.value)"
    :searchable="true"
    :close-on-select="true"
    :show-labels="false"
    :custom-label="opt => options.find(i => i.value == opt).text">
  </multiselect>
  </b-form-group>
  </b-col>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<!--style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style-->
<script>

import EomAbstract from './EomAbstract'
import Multiselect from 'vue-multiselect'

export default {
  inheritAttrs: false,
  mixins: [ EomAbstract ],
  components: {
    Multiselect
  },
  props: {
    value: {
      type: [String, Number, Object]
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selected: null,
      list: [],
    }
  },
  methods: {
    limitText (count) {
      return `and ${count} other countries`
    }
  }
}
</script>
