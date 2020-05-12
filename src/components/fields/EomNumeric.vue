<template>
  <b-col sm="12" md="6">
    <b-form-group :invalid-feedback="error" :state="state">
    <template v-slot:label>
    <i v-if="help" class="fas fa-info-circle align-middle" @click="toggleHelp = !toggleHelp" /> {{label}} <span class="text-danger">*</span>
    </template>
    <b-input-group :size="size">
      <b-input-group-text v-if="icon" slot="prepend"><i :class="icon"></i></b-input-group-text>
    <vue-numeric
      decimal-separator=","
      thousand-separator=""
      :precision="2"
      @input="update($event)" 
      :value="value"
      :readOnly="evalExpr(readOnly)"
      :disabled="evalExpr(disabled)"
      :class="[ 'form-control', this.state?'is-valid':'is-invalid' ]"
      type="number"
    />

    </b-input-group>
    <b-form-text v-show="toggleHelp" v-html="help"></b-form-text>
  </b-form-group>
  </b-col>
</template>

<script>
import EomAbstract from './EomAbstract'
import VueNumeric from 'vue-numeric'

export default {
  inheritAttrs: false,
  name: 'EomNumeric',
  mixins: [ EomAbstract ],
  components: {
    VueNumeric
  }
}
</script>
