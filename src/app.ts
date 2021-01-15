import Vue from 'vue';
import Hello from './Hello.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

document.addEventListener('DOMContentLoaded', () => {
  new Vue(Hello).$mount('#app');
});