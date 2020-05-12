<template>
  <b-col sm="6" cols="12">
  <b-form-group :invalid-feedback="error" :state="state">
    <template v-slot:label>
    <i v-if="help" class="fas fa-info-circle align-middle" @click="showHelp = !showHelp" /> {{label}} <span class="text-danger">*</span>
    <small>(<a href="#" tabindex="-1" @click="generatePassword(12,4,true)">generate</a>)</small></template>
    <b-input-group tabindex="-1" :size="size">
      <b-input-group-text v-if="icon" slot="prepend"><i :class="icon"></i></b-input-group-text>
      <input
        :type="passwords"
        autocapitalize="off"
        autocomplete="off"
        class="form-control border-right-0 "
        :value="value"
        @input="update($event.target.value)"
      />
      <b-input-group-append>
        <button type="button" tabindex="-1" @click="togglePasswords" class="btn btn-outline-primary icon-btn border-left-0"><i :class="passwordsIcon"></i></button>
      </b-input-group-append>
    </b-input-group>
    <password
       :value="value"
       :secureLength="8"
       :strength-meter-only="true"
    >
    </password>
    <b-form-text v-show="showHelp" v-html="help"></b-form-text>
  </b-form-group>
  </b-col>
</template>

<!--style src="@/vendor/libs/vue-password-strength-meter/vue-password-strength-meter.scss" lang="scss"></style-->
<style>

.input-group:not(:focus-within) .btn {
 border-color: rgba(24, 28, 33, 0.1);
}

</style>
<script>
import EomAbstract from './EomAbstract'
import { sample, random } from 'lodash'
import Password from 'vue-password-strength-meter'

export default {
  inheritAttrs: false,
  mixins: [ EomAbstract ],
  components: {
    Password
  },
  props: {
  },
  data: () => ({
    passwords: 'password',
    passwordsIcon: 'ion ion-ios-eye-off'
  }),
  methods: {
    togglePasswords () {
      if (this.passwords === 'password') {
        this.passwordsIcon = 'ion ion-ios-eye'
        this.passwords = 'text'
      } else {
        this.passwordsIcon = 'ion ion-ios-eye-off'
        this.passwords = 'password'
      }
    },
    generatePassword (length, numlength, mixcase) {
      this.passwordsIcon = 'ion ion-ios-eye'
      this.passwords = 'text'

      let ret = ''
      let vowels = 'aeioe'
      let consonants = 'bcdfghklmnpqrstvwxzy'

      if (mixcase) {
        vowels += vowels.toUpperCase()
        consonants += consonants.toUpperCase()
      }

      vowels = vowels.split('')
      consonants = consonants.split('')

      for (var i = 0; i < length / 2; i++) {
        ret += sample(vowels)
        ret += sample(consonants)
      }

      if (numlength) {
        let pos = random(2, length - 2 - numlength)
        ret = ret.substr(0, pos) + random(Math.pow(10, numlength - 1), Math.pow(10, numlength) - 1) + ret.substr(pos + numlength)
      }

      /*
      let ev = document.createEvent('HTMLEvents')
      ev.initEvent('change', true, true)

      let el = this.$el.querySelector('input')
      el.dispatchEvent(ev)
      */

      this.$emit('input', ret)
    }
  }
}
</script>
