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
    </b-container>
</template>

<script>
const SCHEMA = {
  selectOne: {
    component: "EomSelect",
    label: "selectOne",
    options: [
      {text: "Option A", value: "A"},
      {text: "Option B", value: "B"}
    ]
  },
  select: {
    component: "EomSelect",
    label: "select",
    multiple: "true",
    options: [
      {text: "Option A", value: "A"},
      {text: "Option B", value: "B"}
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
        select: [ 'A', 'B' ],
	selectOne: 'B',
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
