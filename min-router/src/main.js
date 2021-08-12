import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import router from "./router";
Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.vm = vm;
