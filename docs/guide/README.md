# Getting Started

EOM+ form is a library that allows you to generate schema-driven forms. It has been inspired by project like [vue-form-generator](https://github.com/vue-generators/vue-form-generator), [dynamic-schema-vuelidate](https://github.com/marina-mosti/dynamic-schema-vuelidate) or [formvuelatte](https://formvuelatte.netlify.app/) 

We create this to help us to solve real life forms problems into real life projects. I mean that EOM+ form is not the fastest form processor neither the lightest but
it does the job. We use it in production with Laravel REST api as backend.

## Dependencies

EOM+ form uses
* [bootstrap-vue](https://bootstrap-vue.org/)
* [lodash](https://lodash.com/)
* [expression-eval](https://github.com/donmccurdy/expression-eval)
* [vue-i18n](https://kazupon.github.io/vue-i18n/)

moreover it uses other components like [vue-multiselect](https://vue-multiselect.js.org/)

## Installation

### NPM

You can install it via [NPM](http://npmjs.org/) or [yarn](https://yarnpkg.com/).
```
$ npm install eom-form
```

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et ipsum suscipit, ultrices lectus at, ultrices lorem. Ut vel dui est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In hac habitasse platea dictumst. Proin laoreet purus bibendum mi maximus ultrices. Vivamus lobortis sem sed odio commodo, id faucibus neque pharetra. Nullam maximus tincidunt consequat. Duis at enim in sem feugiat vestibulum.

## Usage

```html
<template>
  <div id="app">
   <b-container> 
      <b-alert :variant="status.variant" dismissible v-model="status.message" v-if="status.message">
        {{ status.message }}
      </b-alert>

      <form class="mb-3" @submit.prevent="handleSubmit" novalidate>
        <EomForm
          :schema="schema"
          v-model="model"
          ref="eomForm"
        />
        <b-btn variant="success" type="submit">submit</b-btn>
      </form>
    </b-container>
  </div>
</template>

<script>
import Vue from 'vue'
import EomForm from 'eom-form'
import schema from './data/schema.json'
  
Vue.use(EomForm)

export default {
  name: 'App',
  data () {
    return {
      status: {
        message: '',
        variant: 'success'
      },
      schema,
      model: {},
    }
  },
  methods: {
    handleSubmit () {
      this.status.message = ''
      let valid = this.$refs.eomForm.validate()

      if (!valid) {
        console.warn('invalid form')
        this.status.message = 'invalid_datas'
        this.status.variant = 'danger'
        return
      }
    }
  }
}
</script>
```

### Usage in local components

```js
import EomForm from "eom-form";

export default {
  components: {
    "eom-form": EomForm
  }
};
```

