<template>
  <b-col sm="12">
  <b-form-group :invalid-feedback="error" :state="state">
    <template v-slot:label>
    <i v-if="help" class="fas fa-info-circle align-middle" @click="toggleHelp = !toggleHelp" /> {{label}} <span class="text-danger" v-if="evalExpr(required)">*</span>
    </template>
    <b-input-group :size="size">
      <b-input-group-text v-if="icon" slot="prepend"><i :class="icon"></i></b-input-group-text>
    <b-textarea
      :value="value"
      @input="update($event)"
      @change="validate"
      :maxlength="maxlength"
      rows=4
      :state="state"
    />
    </b-input-group>
    <b-form-text v-if="maxlength">remaining_chars {{maxlength-value.length}}</b-form-text>
    <b-form-text v-show="toggleHelp" v-html="help"></b-form-text>
  </b-form-group>
  </b-col>
</template>

<script>
import EomAbstract from './EomAbstract'

export default {
  inheritAttrs: false,
  mixins: [ EomAbstract ],
  props: {
  }
}
</script>
