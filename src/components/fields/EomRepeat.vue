<template>
  <div class="repeat-container col-12">
    <b-row v-for="(item, index) in value" class="repeat-row" :key="index" tabindex="-1" >
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

export default {
  mixins: [ EomContainer ],
  data () {
    return {
    }
  },
  methods: {
    addRow: function (index) {
      this.value.splice(index + 1, 0, Vue.util.extend({}, this.value[index]))
    },
    deleteRow: function (index) {
      Vue.delete(this.value, index)
    }
  }	
}
</script>
