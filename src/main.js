import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import VueGtag from 'vue-gtag'
import OhVueIcon from 'oh-vue-icons'
import { IoArrowUndoSharp, RiDeleteBin6Line, BiArrowLeftSquareFill, BiArrowRightSquareFill, BiMusicNoteBeamed, PxCopy } from 'oh-vue-icons/icons'

Vue.use(VueMeta)
Vue.use(VueGtag, {
  config: { id: "G-ERYCLRHBD7" },
  bootstrap: false
});

OhVueIcon.add([
  IoArrowUndoSharp,
  RiDeleteBin6Line,
  BiArrowLeftSquareFill,
  BiArrowRightSquareFill,
  BiMusicNoteBeamed,
  PxCopy
]);
Vue.component("VIcon", OhVueIcon);

Vue.config.productionTip = false

Vue.directive('visible', function(el, binding) {
  el.style.visibility = binding.value ? 'visible' : 'hidden';
});

new Vue({
  render: h => h(App),
}).$mount('#app')
