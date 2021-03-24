import Vue from 'vue'
import App from './App.vue'

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import VueGtag from "vue-gtag";
Vue.use(VueGtag, {
  config: { id: "G-ERYCLRHBD7" }
});

import OhVueIcon from "oh-vue-icons";
import { IoArrowUndoSharp, RiDeleteBin6Line } from "oh-vue-icons/icons";
OhVueIcon.add([IoArrowUndoSharp, RiDeleteBin6Line]);
Vue.component("v-icon", OhVueIcon);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
