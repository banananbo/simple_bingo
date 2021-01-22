import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueRouter from 'vue-router';
import routes from './router/router.ts';
import store from './store/index.ts';
// import VueCarousel from 'vue-carousel';

// font awsome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas, far, fab);
Vue.component('v-fa', FontAwesomeIcon);
// -- font awsome

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

// Vue.use(VueCarousel);

document.addEventListener('DOMContentLoaded', () => {
  // new Vue(Hello).$mount('#app');
  new Vue({
    el: '#app',
    router: router,
    store: store,
    beforeCreate(){
      this.$store.dispatch('doLoad')
    }
  })
});