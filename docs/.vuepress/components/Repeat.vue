<template>
   <b-container class="p-2">
      <b-alert :variant="status.variant" dismissible v-model="status.invalid" v-if="status.message">
        {{status.message}} 
      </b-alert>

      <form class="mb-3" @submit.prevent="handleSubmit" novalidate>
        <EomForm
          :schema="schema"
          v-model="model"
          ref="eomForm"
        />
        <b-btn variant="success" type="submit">submit</b-btn>
      </form>

      <pre class="language-json" v-html="model"></pre>
    </b-container>
</template>

<script>
const SCHEMA = [
  {
    component: "EomInput",
    model: "firstname",
    label: "firstname",
    icon: "ion ion-ios-person",
    help: "introduce tu nombre",
    validations: {
      required: {
      },
      minLength: {
        min: 3
      }
    }
  },
  {
    component: "EomRepeat",
    model: "group",
    schema: [
      [
        {
          component: "EomInput",
          model: "ipaddress",
          label: "ipaddress",
          autocomplete: "off",
          validations: {
            required: {},
             ip: {}
	        }
        },
        {
          component: "EomInput",
          model: "macaddress",
          label: "macaddress",
          autocomplete: "off",
          validations: {
            required: {},
            macAddress: {}
          }
        }
      ]
    ]
  }
]

export default {
  data () {
    return {
      status: {
        message: '',
        variant: 'success',
        invalid: false
      },
      schema: SCHEMA,
      model: {
        firstname: '',
        description: '',
        enabled: 0,
        group: [
          { 
            ipaddress : '',
            macaddress: ''
          }
        ]
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
  }
}
</script>
