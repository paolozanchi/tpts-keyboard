import Vue from 'vue'
import App from './App.vue'
import VueGtag from 'vue-gtag'
import OhVueIcon from 'oh-vue-icons'
import { IoArrowUndoSharp, RiDeleteBin6Line, BiArrowLeftSquareFill, BiArrowRightSquareFill, BiMusicNoteBeamed, PxCopy } from 'oh-vue-icons/icons'

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

new Vue({
  render: h => h(App),
}).$mount('#app')
