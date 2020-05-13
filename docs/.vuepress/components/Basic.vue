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
        <b-row>
          <b-col>
            <b-btn variant="success" type="submit">submit</b-btn>
          </b-col>
        </b-row>
      </form>
 
      <pre class="language-json" v-html="model"></pre>
   </b-container>
</template>

<script>
const SCHEMA = {
  firstName: {
    component: "EomInput",
    label: "firstname",
    icon: "ion ion-ios-person",
    help : "introduce tu nombre",
    validations: {
      required: {
      },
      minLength: {
        min: 3
      }
    }
  },
  description: {
    component: "EomTextarea",
    label: "description",
    icon: "ion ion-ios-chatboxes",
    help: "enter a long description",
    maxlength: 50
  },
  enabled: {
    component: "EomCheckbox",
    label: "enabled",
    help: "this checkbox enable/disable something"
  },
  checkboxGroup: {
    component: "EomCheckboxGroup",
    label: "checkboxGroup",
    options: [
      { text: "Option A", value: "A" },
      { text: "Option B", value: "B" }
    ]
  },
  radioGroup: {
    component: "EomRadioGroup",
    label: "radioGroup",
    options: [
      { text: "Option A", value: "A" },
      { text: "Option B", value: "B" }
    ]
  },
  selectOne: {
    component: "EomSelect",
    label: "selectOne",
    options: [
      { text: "Option A", value: "A" },
      { text: "Option B", value: "B" }
    ]
  }
}

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
        firstName: 'ABC',
        description: '',
        enabled: 0
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
