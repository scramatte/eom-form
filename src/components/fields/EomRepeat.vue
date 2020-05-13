<template>
  <div class="repeat-container col-12">
    <b-row 
      v-for="(item, index) in value"
      class="repeat-row" 
      :key="index"
      tabindex="-1" 
      @keydown.backspace="deleteRow(index, $event)"
      @keydown.enter="addRow(index, $event)" >
        <div class="row-buttons">
          <b-btn variant="danger" class="icon-btn" v-if="value.length  > 1" tabindex="-1" @click="deleteRow(index, $event)" size="xs"><i class="fas fa-minus" /></b-btn>
          <b-btn variant="success" class="icon-btn" v-if="value.length < 100" tabindex="-1" @click="addRow(index, $event)" size="xs"><i class="fas fa-plus" /></b-btn>
        </div>
        <component
            v-for="field in parsedSchema[0]"
            :key="field.model"
            :name="field.model"
            :is="field.component"
            v-bind="binds(field)"
            :value="val(field, index)"
            @input="update(field.model, index, $event)"
        >
        <slot/>
        </component>
    </b-row>
    <!--pre v-html="prettyJSON(parsedSchema)"></pre-->
  </div>
</template>

<style>
.key {
  font-weight: bold;
  color: #02BC77;
}

.row-repeat {
  vertical-align:top;
  padding: 0;
}

.row.repeat-row:focus-within,
.row.repeat-row:focus {
  background-color: #f5f5dc;
  border: 1px solid #deb887;
  border-radius: 5px;
  outline: none;
}

.row-buttons {
    visibility: hidden;
    position: absolute;
    right: 10px;
    margin-top: -10px;
    z-index: 9999;
}

.row:focus-within > .row-buttons,
.row:focus > .row-buttons {
   visibility: visible;
}

.btn.btn-xs.icon-btn {
  padding: 0 0.2rem;
  margin-right: 5px;
  height: 20px; 
  font-size: 0.8rem; 
}

.btn.btn-xs.icon-btn > * {
  pointer-events: none;
}
</style>
<script>
import Vue from 'vue'
import EomContainer from './EomContainer.js'

// import { isArray } from 'lodash'

function setFocussable (element, index) {
  let focussableElements = 'input:not([tabindex="-1"]), select:not([tabindex="-1"])'
  let focussable = element.querySelectorAll(focussableElements)
  let nextElement = null

  if (index < 0) {
    index = focussable.length + index
  }

  if ((nextElement = focussable[index])) {
    nextElement.focus()
  }
}

export default {
  mixins: [ EomContainer ],
  data () {
    return {
    }
  },
  props: {
    'minOccurs': {
      default: 1
    },
    'maxOccurs': {
      default: 25
    },
    'autofocus': {
      default: true
    },
    'enterToFocus': {
      default: true
    },
    'backspaceToFocus': {
      default: true
    },
    'baseRow': {
      type: Object
    }
  },
  methods: {
    addRow: function (index, event) {
      let target = event.target
      while (!target.matches('.repeat-row')) {
        target = target.parentElement
      }

      if (event.keyCode === 13 && this.enterToFocus) {
        event.stopPropagation()
        event.preventDefault()

        let focussableElements = 'input:not([tabindex="-1"]), select:not([tabindex="-1"])'
        let focussable = target.querySelectorAll(focussableElements)

        if (document.activeElement && document.activeElement.form) {
          let tabindex = Array.from(focussable).indexOf(document.activeElement)
          if (tabindex > -1 && tabindex < focussable.length - 1) {
            focussable[tabindex + 1].focus()
            return
          }
        }
      }

      if (this.value.length < this.maxOccurs) {
        this.value.splice(index + 1, 0, Vue.util.extend({}, this.baseRow || this.value[index]))
        Vue.nextTick(() => {
          if (target && target.nextSibling) {
            setFocussable(target.nextSibling, 0)
          }
        })
      }
    },
    deleteRow: function (index, event) {
      let target = event.target
      while (!target.matches('.repeat-row')) {
        target = target.parentElement
      }

      if (event.keyCode === 8 && this.backspaceToFocus) {
        event.preventDefault()
        event.stopPropagation()

        let focussableElements = 'input:not([tabindex="-1"]), select:not([tabindex="-1"])'
        let focussable = target.querySelectorAll(focussableElements)

        if (document.activeElement && document.activeElement.form) {
          if (document.activeElement.selectionStart > 0) {
            return
          }

          let tabindex = Array.from(focussable).indexOf(document.activeElement)
          if (tabindex > 0) {
            let newElement = focussable[tabindex - 1]
            newElement.focus()
            newElement.select()
            return
          }
        }
      }

      if (this.value.length > this.minOccurs) {
        if (target && target.previousSibling) {
          setFocussable(target.previousSibling, -1)
        }
        Vue.delete(this.value, index)
      }
    }
  }	
}
</script>
