<template>
  <b-col sm="12" md="6">
    <b-form-group :invalid-feedback="error" :state="state">
    <template v-slot:label>
    <i v-if="help" class="fas fa-info-circle align-middle" @click="showHelp = !showHelp" /> {{label}} <span class="text-danger">*</span>
    </template>
    <b-input-group :size="size">
      <b-input-group-text v-if="icon" slot="prepend"><i :class="icon"></i></b-input-group-text>
    <b-input
      :state="state"
      :value="value"
      :readOnly="evalExpr(readOnly)"
      :disabled="evalExpr(disabled)"
      @input="update($event)"
    />
    </b-input-group>
    <b-form-text v-show="showHelp" v-html="help"></b-form-text>
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
    showHelp: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    }
  }
}
</script>
