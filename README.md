# Eom+ Form (eom-form)

A schema-based form generator component for Vue.js 
 
It has been inspired by project like [vue-form-generator](https://github.com/vue-generators/vue-form-generator), [dynamic-schema-vuelidate](https://github.com/marina-mosti/dynamic-schema-vuelidate) or [formvuelatte](https://formvuelatte.netlify.app/)

## Why a new lib?

This project is not a "proof of concept". It's a lib to solve real life problems into real life project.

## Features

*   reactive forms based on schemas
*   group and repeat form elements
*   built-in validators
*   based on bootstrap-vue components

## Documentation

...

## Dependencies

eom-form uses mainly [bootstrap-vue], [lodash](https://lodash.com/) and [expression-eval](https://github.com/donmccurdy/expression-eval) internally.

moreover it uses other components like [vue-multiselect](https://vue-multiselect.js.org/)

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
  data () {
    return {
      model: {
      },
      schema
    }
  }
}
</script

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