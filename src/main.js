import Vue from 'vue'
import App from './App.vue'
import OhVueIcon from 'oh-vue-icons'
import { IoArrowUndoSharp, RiDeleteBin6Line, BiArrowLeftSquareFill, BiArrowRightSquareFill, BiMusicNoteBeamed, PxCopy } from 'oh-vue-icons/icons'

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
