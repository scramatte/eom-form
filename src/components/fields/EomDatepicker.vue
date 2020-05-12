<template>
  <b-col sm="12" md="6">
    <b-form-group :invalid-feedback="error" :state="state">
    <template v-slot:label>
    <i v-if="help" class="fas fa-info-circle align-middle" @click="toggleHelp = !toggleHelp" /> {{label}} <span class="text-danger">*</span>
    </template>
    <datepicker
      :value="value"
      :typeable="true"
      format="DD/MM/YYYY"
      language="es"
      :input-class="(this.state?'is-valid':'is-invalid')"
      @input="update($event)"
      :bootstrapStyling="true" />
   <b-form-text v-show="toggleHelp" v-html="help"></b-form-text>
  </b-form-group>
  </b-col>
</template>

<script>
import EomAbstract from './EomAbstract'
import Datepicker from '@hokify/vuejs-datepicker'
import 'moment/locale/es'
import moment from 'moment'

import '@hokify/vuejs-datepicker/dist/vuejs-datepicker.css'

export default {
  inheritAttrs: false,
  name: 'EomDatepicker',
  mixins: [ EomAbstract ],
  components: {
    Datepicker
  },
  props: {
    value: {
      type: [String]
    }
  },
  data () {
    return {
    }
  },
  methods: {
    update (value) {
      if (value) { 
        console.warn(value)
        this.$emit('input', moment(value).format('YYYY-MM-DD'))
      }
    }
  }
}
</script>
