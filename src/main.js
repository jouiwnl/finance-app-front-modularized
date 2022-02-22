import Vue from "vue";
import App from "./App.vue";
import router from "./router";
window.$ = window.jQuery = require('jquery');
import 'jquery';
window.tata = require('tata-js');
import 'tata-js';
import VueHtmlToPaper from 'vue-html-to-paper';

import 'vue-search-select/dist/VueSearchSelect.css';
import 'vue2-datepicker/index.css';

import partnersModule from "./modules/partners";
import finderModule from "./modules/finder";
import loansModule from "./modules/loans";
import emailsModule from "./modules/emails";

import { registerModules } from "./register-modules";
import vuetify from "./plugins/vuetify";

import VuetifyConfirm from 'vuetify-confirm';

registerModules({
  partners: partnersModule,
  loans: loansModule,
  finder: finderModule,
  emails: emailsModule
});

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

Vue.config.productionTip = false;
Vue.use(VuetifyConfirm, { vuetify });
Vue.use(VueHtmlToPaper, options);

export const eventBus = new Vue();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
