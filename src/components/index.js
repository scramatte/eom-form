import Vue from "vue";
import EomForm from "./EomForm.vue";

const Components = {
  EomForm
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;

