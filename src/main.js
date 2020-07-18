import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  el: "#app",
  router,
  store,
  vuetify,
  components: { App },
  template: "<App/>"
});
