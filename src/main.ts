import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import axios from 'axios';
import VueApexCharts from 'vue-apexcharts';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.component('apexchart', VueApexCharts);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
