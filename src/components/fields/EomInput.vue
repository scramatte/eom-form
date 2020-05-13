<template>
  <b-col sm="12" md="6">
    <b-form-group :invalid-feedback="error" :state="state">
    <template v-slot:label>
    <i v-if="help" class="fas fa-info-circle align-middle" @click="toggleHelp = !toggleHelp" /> {{label}} <span class="text-danger" v-if="evalExpr(required)">*</span>
    </template>
    <b-input-group :size="size">
      <b-input-group-text v-if="icon" slot="prepend"><i :class="icon"></i></b-input-group-text>
    <b-input
      type="text"
      :state="state"
      :value="value"
      :readOnly="evalExpr(readOnly)"
      :disabled="evalExpr(disabled)"
      :autocomplete="autocomplete"
      :maxlength="maxlength"
      @input="update($event)"
    />
    </b-input-group>
    <b-form-text v-show="toggleHelp" v-html="help"></b-form-text>
  </b-form-group>
  </b-col>
</template>

<script>
import EomAbstract from './EomAbstract'

export default {
  inheritAttrs: false,
  name: 'EomInput',
  mixins: [ EomAbstract ],
  props: {
    autocomplete: {
    }
  },
  methods: {
  },
  data () {
    return {
      toggleHelp: false
    }
  },
  created() {
    if (this.required) {
      this.validations['required'] = {}
    }
  } 
}
</script>
