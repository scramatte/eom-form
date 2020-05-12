<template>
   <b-container class="p-2">
      <h5><a href="/">Examples</a> > More validators</h5>
      <b-alert :variant="status.variant" dismissible v-model="status.invalid" v-if="status.message">
        {{ $t(status.message) }} 
      </b-alert>

      <form class="mb-3" @submit.prevent="handleSubmit" novalidate>
        <EomForm
          :schema="schema"
          v-model="model"
          ref="eomForm"
        />
        <b-btn variant="success" type="submit">{{$t('submit')}}</b-btn>
      </form>
    </b-container>
</template>

<script>
import schema from '../data/more.json'
import EomForm from '../components/EomForm.vue'

export default {
  name: 'App',
  components: {
    EomForm
  },
  data () {
    return {
      status: {
        message: '',
        variant: 'success',
        invalid: false
      },
      schema,
      model: {
        spanishId: '39921948C',
        bankAccount: 'ES0504873597264184221852',
        ipAddress: '192.168.20.7',
        ipv6Address: '2001:1:2:3:4:5:6:7',
        macAddress: '0000.0000.0000',
        e164PhoneNumber: '+34968000730',
        alpha: 'abcd',
        alphaDash: 'a-b_c',
        alphaNumeric: 'abc123',
        digits: '1234',
        digitsBetween: 25,
        amount: '5.50',
        numeric: '18.36',
        date: '2020-05-07',
        startsWith: 'https://',
        endsWith: 'EUROS'
      },
    }
  },
  methods: {
    handleSubmit () {
      this.status.message = ''
      let valid = this.$refs.eomForm.validate()

      if (!valid) {
        console.warn('invalid form')
        this.status = {
          message:  'invalid_datas',
          variant:  'danger',
          invalid: true
        }
        return
      }
    }
  }
}
</script>
