<template>
  <b-col sm="12">
  <b-form-group :invalid-feedback="error" :state="state">
    <template v-slot:label>
    <i v-if="help" class="fas fa-info-circle align-middle" @click="toggleHelp = !toggleHelp" /> {{label}} <span class="text-danger">*</span>
    </template>

    <quill-editor
      :value="value"
      @input="update($event)"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    >
	<div id="toolbar" slot="toolbar">
        <!-- Add a bold button -->
        <button class="ql-bold">Bold</button>
        <button class="ql-italic">Italic</button>
        <!-- Add font size dropdown -->
        <select class="ql-size">
          <option value="small"></option>
          <!-- Note a missing, thus falsy value, is used to reset to default -->
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
      </div>
    </quill-editor>

    <b-form-text v-show="toggleHelp" v-html="help"></b-form-text>
  </b-form-group>
  </b-col>
</template>

<script>
import EomAbstract from './EomAbstract'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  inheritAttrs: false,
  mixins: [ EomAbstract ],
  components: {
    quillEditor
  },
  props: {
  },
  data () {
    return {
      editorOption: {
        modules: {
          toolbar: '#toolbar'
        }
      }
    }
  },
  methods: {
      onEditorBlur() {
      },
      onEditorFocus() {
      },
      onEditorReady() {
      },
      onEditorChange({}) {
      }
  }
}
</script>
