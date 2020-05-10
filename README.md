# Eom+ Form (eom-form)

A schema-based form generator component for Vue.js 
 
It has been inspired by project like [vue-form-generator](https://github.com/vue-generators/vue-form-generator), [dynamic-schema-vuelidate](https://github.com/marina-mosti/dynamic-schema-vuelidate) or [formvuelatte](https://formvuelatte.netlify.app/)

## Why a new lib?

This project is not a "proof of concept". It's a lib to solve real life problems into real life project.

## Screenshots

![Basic Form](https://scramatte.github.io/eom-form-docs/eomform1.png)

## Features

*   reactive forms based on schemas
*   group and repeat form elements
*   built-in validators
*   based on bootstrap-vue components

## Documentation

Full updated documentation is available [here](https://scramatte.github.io/eom-form-docs/)

## Dependencies

eom-form uses mainly 
* [bootstrap-vue](https://bootstrap-vue.org/)
* [lodash](https://lodash.com/)
* [expression-eval](https://github.com/donmccurdy/expression-eval)
* [vue-i18n](https://kazupon.github.io/vue-i18n/)

moreover it uses other components like [vue-multiselect](https://vue-multiselect.js.org/)

we also include open source icon fonts such font awesome 5, ionicons,open iconic, stroke icons 7, linearicons

## Installation

### NPM

You can install it via [NPM](http://npmjs.org/) or [yarn](https://yarnpkg.com/).

#### Latest version for Vue 2.x

```
$ npm install eom-form
```

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

## Usage in local components

```js
import EomForm from "eom-form";

export default {
  components: {
    "eom-form": EomForm
  }
};
```

## Development

This command will start a `webpack-dev-server` with content of `src` folder.

```bash
npm run serve
```

## Build

This command will build a distributable version in the `dist` directory.

```bash
npm run build
```

## Build Bundle

This command will bundle package for production use

```bash
npm run build-bundle
```

## Contribution

Please send pull requests improving the usage and fixing bugs, improving documentation and providing better examples, or providing some testing, because these things are important.

## License

eom-form is available under the [GPL v3 license](https://www.gnu.org/licenses/gpl-3.0-standalone.html).

## Contact

Copyright (C) 2020 Eom+
