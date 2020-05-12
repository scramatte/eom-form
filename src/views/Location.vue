<template>
   <b-container class="p-2">
      <h1>EOM+ form</h1>
      <h2><a href="/">Examples</a> > Repeat</h2>
      <b-alert :variant="status.variant" dismissible v-model="status.invalid" v-if="status.message">
        {{ $t(status.message) }} 
      </b-alert>

      <div v-if="location">
        Your location data is {{ location.coords.latitude }}, {{ location.coords.longitude}}
      </div>

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
import schema from '../data/upload.json'
import EomForm from '../components/EomForm.vue'

export default {
  name: 'App',
  components: {
    EomForm
  },
  data () {
    return {
      location:null,
      gettingLocation: false,
      status: {
        message: '',
        variant: 'success',
        invalid: false
      },
      schema,
      model: {
        attachments: []
      }
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
  },
  created () {
    if(!("geolocation" in navigator)) {
      this.errorStr = 'Geolocation is not available.';
      return;
    }

    this.gettingLocation = true;

    navigator.geolocation.getCurrentPosition(pos => {
      this.gettingLocation = false;
      this.location = pos;
    }, err => {
      this.gettingLocation = false;
      this.errorStr = err.message;
    })
  }
}
</script>
