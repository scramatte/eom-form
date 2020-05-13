# Getting Started

EOM+ form is a library that allows you to generate schema-driven forms. It has been inspired by project like [vue-form-generator](https://github.com/vue-generators/vue-form-generator), [dynamic-schema-vuelidate](https://github.com/marina-mosti/dynamic-schema-vuelidate) or [formvuelatte](https://formvuelatte.netlify.app/) 

We create this to help us to solve real life forms problems into real life projects. I mean that EOM+ form is not the fastest form processor neither the lightest but
it does the job. We use it in production with Laravel REST api as backend.

## Screenshots

![Basic Form](https://scramatte.github.io/eom-form-docs/eomform1.png)

## Features

*   reactive forms based on schemas
*   group and repeat form elements
*   over 20 built-in validators
*   use bootstrap-vue components and styles

## What we would like to implement

*   Dependency model like in XForms
*   Expressions into JSON
*   [Framework7](https://framework7.io/) version
*   Formbuilder

## Dependencies

eom-form uses mainly 
*   [bootstrap-vue](https://bootstrap-vue.org/)
*   [lodash](https://lodash.com/)
*   [expression-eval](https://github.com/donmccurdy/expression-eval)
*   [vue-i18n](https://kazupon.github.io/vue-i18n/)

moreover it uses other components like
*   [vue-multiselect](https://vue-multiselect.js.org/)
*   [vue-currency](https://dm4t2.github.io/vue-currency-input/)
*   [@hokify/vuejs-datepicker](https://github.com/hokify/vuejs-datepicker)
*   [vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)

we also include open source icon fonts such font awesome 5, ionicons,open iconic, stroke icons 7, linearicons

## Installation

### NPM

You can install it via [NPM](http://npmjs.org/) or [yarn](https://yarnpkg.com/).
```
$ npm install eom-form
```

## Usage

### EomForm props

The `EomForm` component requires you to pass it `schema`, `model` and `ref` properties.
 
The `schema` can be both an `object` or an `array`, internally it will be transformed to an `array`.
You can embed directly the JSON data, import it from local file or fetch it from your rest API.

The `model` are the data themselves. The payload that you will submit to your API. For complex forms with repeat blocks you must declare an empty structure to get it working.
As with `schema` prop, you can embed, import or fetch the content.

Finally, you must set a `ref` property as it's necesarry to be able to call EomForm's validate method on submit form.

### Main file (App.vue)
	
```html <template>
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

### Schema

```json
{
  "firstName": {
    "component": "EomInput",
    "label": "firstname",
    "icon": "ion ion-ios-person",
    "help" : "introduce tu nombre",
    "validations": {
      "required": {
      },
      "minLength": {
        "min": 3
      }
    }
  },
  "description": {
    "component": "EomTextarea",
    "label": "description",
    "icon": "ion ion-ios-chatboxes",
    "help": "enter a long description",
    "maxlength": 50
  },
  "enabled": {
    "component": "EomCheckbox",
    "label": "enabled",
    "help": "this checkbox enable/disable something"

  },
  "checkboxGroup": {
    "component": "EomCheckboxGroup",
    "label": "checkboxGroup",
    "options": [
      { "text": "Option A", "value": "A" },
      { "text": "Option B", "value": "B" }
    ]
  },
  "radioGroup": {
    "component": "EomRadioGroup",
    "label": "radioGroup",
    "options": [
      { "text": "Option A", "value": "A" },
      { "text": "Option B", "value": "B" }
    ]
  },
  "selectOne": {
    "component": "EomSelectOne",
    "label": "selectOne",
    "options": [
      { "text": "Option A", "value": "A" },
      { "text": "Option B", "value": "B" }
    ]
  }
}
```

### Playground 

<SplitTab>
<Basic slot="example"/>
<<< @/docs/.vuepress/components/Basic.vue
</SplitTab>

## Examples

### Select Example

<SplitTab>
<Select slot="example"/>
<<< @/docs/.vuepress/components/Select.vue
</SplitTab>

### Repeat Example
This example show how to have repeatable structure in your form. You can dynamically add/remove row.

<SplitTab>
<Repeat	slot="example"/>
<<< @/docs/.vuepress/components/Repeat.vue
</SplitTab>

### Upload Example

<SplitTab>
<Upload slot="example"/>
<<< @/docs/.vuepress/components/Upload.vue
</SplitTab>

### Validators Example

<SplitTab>
<More slot="example"/>
<<< @/docs/.vuepress/components/More.vue
</SplitTab>

## Components

All components have common properties to setup things like icon or help hint


### EomInput

Create various type inputs such as: text, password, number, url, email, search, range, date and more

```json
{
  "field": {
    "component": "EomInput",
    "label": "my label",
  }
}
```

### EomPasswordChecker

```json
{
  "field": {
    "component": "EomPasswordChecker",
    "label": "my label",
  }
}
```

### EomCurrency

```json
{
  "field": {
    "component": "EomCurrency",
    "label": "my label",
  }
}
```

### EomTextarea

```json
{
  "field": {
    "component": "EomTextarea",
    "label": "my label",
  }
}
```

### EomCheckbox

```json
{
  "field": {
    "component": "EomCheckbox",
    "label": "my label",
  }
}
```

### EomCheckboxGroup

```json
{
  "field": {
    "component": "EomCheckboxGroup",
    "label": "my label",
    "options": [
      { "text": "Option A", "value": "A" },
      { "text": "Option B", "value": "B" }
    ]
  }
}
```

### EomRadioGroup

```json
{
  "field": {
    "component": "EomRadioGroup",
    "label": "my label",
    "options": [
      { "text": "Option A", "value": "A" },
      { "text": "Option B", "value": "B" }
    ] 
  }
}
```

### EomSelect

```json
{
  "field": {
    "component": "EomSelect",
    "label": "my label",
    "options": [
      { "text": "Option A", "value": "A" },
      { "text": "Option B", "value": "B" }
    ]
  }
}
```

### EomDatepicker

```json
{
  "field": {
    "component": "EomFileUpload",
    "label": "my label",
  }
}
```

### EomFileUpload

```json
{
  "field": {
    "component": "EomFileUpload",
    "label": "my label",
  }
}
```


### EomEditor

```json
{
  "field": {
    "component": "EomEditor",
    "label": "my label",
  }
}
```

## Validators

This library comes with over 20 built in validators.

*   minLength:
*   alpha: 
*   alphaNumeric:
*   alphaDash:
*   date:
*   beforeDate:
*   beforeOrIgualDate: 
*   digits: 
*   digitsBetween:
*   endsWith:
*   startsWith:
*   email:
*   url:
*   sameAs:
*   regex:
*   phoneNumber:
*   spanishID: validate spanish personal identity number (CIF,NIF,NIE)
*   iban: validate an IBAN bank account number
*   e164Number: validate a E.164 phone number (e.g. +34968123456)
*   macAddress: validate a mac address (e.g. af:af:af:af:af:af)
*   ip: validate an ipv4 address (e.g. 192.168.1.1)
*   ipV6: validate an ipv6 address (e.g. 2001:1:2:3:4:5:6:7)

## Contribution

We need hands. Please send pull requests improving the usage and fixing bugs, improving documentation and providing better examples, or providing some testing.
