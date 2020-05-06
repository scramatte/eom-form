<template>
  <b-col sm="12" md="6" lg="4">
  <b-form-group :invalid-feedback="error" :state="state">
    <template v-slot:label>
    <i v-if="help" class="fas fa-info-circle align-middle" @click="toggleHelp = !toggleHelp" /> {{label}} <span class="text-danger">*</span>
    </template>
    <b-checkbox
      :size="size"
      value="1"
      :checked="value"
      unchecked-value="0"
      @change="update($event)"
    >
    </b-checkbox>
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
  },
  methods: {
  }
}
</script>
