import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import VueGtag from "vue-gtag";

Vue.use(VueMeta)

Vue.use(VueGtag, {
  config: { id: "G-ERYCLRHBD7" }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
