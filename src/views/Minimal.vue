<template>
   <b-container class="p-2">
      <h5><a href="/">Examples</a> > Basic</h5>
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
import schema from '../data/minimal.json'

export default {
  name: 'App',
  data () {
    return {
      status: {
        message: '',
        variant: 'success',
        invalid: false
      },
      schema,
      model: {
        firstName: 'ABC',
        description: '',
        enabled: 1,
        checkboxGroup: [ 'A' ],
	radioGroup: 'B',
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
