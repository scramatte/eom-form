<template>
  <b-col sm="12" md="6">
    <b-form-group :invalid-feedback="error" :state="state">
    <template v-slot:label>
    <i v-if="help" class="fas fa-info-circle align-middle" @click="toggleHelp = !toggleHelp" /> {{label}} <span class="text-danger" v-if="evalExpr(required)">*</span>
    </template>
    <b-input-group :size="size">
      <b-input-group-text v-if="icon" slot="prepend"><i :class="icon"></i></b-input-group-text>
      <currency-input
        @input="update($event)"
        :value="Number(value)"
        currency="EUR"
        locale="es"
        :readOnly="evalExpr(readOnly)"
        :disabled="evalExpr(disabled)"
        :class="[ 'form-control', this.state?'is-valid':'is-invalid' ]"
      />
    </b-input-group>
    <b-form-text v-show="toggleHelp" v-html="help"></b-form-text>
  </b-form-group>
  </b-col>
</template>

<script>
import EomAbstract from './EomAbstract'
import { CurrencyInput } from 'vue-currency-input'

export default {
  inheritAttrs: false,
  name: 'EomCurrency',
  mixins: [ EomAbstract ],
  components: {
   CurrencyInput 
  }
}
</script>
