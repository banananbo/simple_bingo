import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueRouter from 'vue-router';
import routes from './router.ts';
// import VueCarousel from 'vue-carousel';

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

// Vue.use(VueCarousel);

document.addEventListener('DOMContentLoaded', () => {
  // new Vue(Hello).$mount('#app');
  new Vue({
    el: '#app',
    router: router
  })
});