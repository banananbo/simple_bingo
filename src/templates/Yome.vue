<template>
    <section>
        <div id="main">
         <router-view></router-view>
        </div>
        <Footer></Footer>
    </section>
</template>
<script lang="ts">
import Vue from "vue"
import Footer from "@organisms/yome/Footer.vue";

export default Vue.extend({

components:{
        Footer
      }
})

</script>
<style>
div#main{
    width:100%;
    margin:auto;
    padding:60px 0 60px 0;    /* 上下に160pxを余白を取る */
}
div#header-fixed
{
    position: fixed;            /* ヘッダーの固定 */
    top: 0px;                   /* 位置(上0px) */
    left: 0px;                  /* 位置(右0px) */
    width: 100%;                /* 横幅100%　*/
    height: 50px;              /* 縦幅140px */
    z-index: 99;
}
div#footer-fixed
{
    position: fixed;            /* フッターの固定 */
    bottom: 0px;                /* 位置(下0px) */
    left: 0px;                  /* 位置(左0px) */
    width: 100%;                /* 横幅100%　*/
    height: 50px;              /* 縦幅140px */
    background-color:#444;     /* 背景色(黒) */
	padding:10px 0 20px;       /* 上10px、下20pxをあける */
}


/* navigation bar */
.navbar {
  background-color: #ffb310;
}
.navbar .navbar-brand {
  color: #ecf0f1;
}
.navbar .navbar-brand:hover,
.navbar .navbar-brand:focus {
  color: #d5e7cc;
}
.navbar .navbar-text {
  color: #ecf0f1;
}
.navbar .navbar-text a {
  color: #d5e7cc;
}
.navbar .navbar-text a:hover,
.navbar .navbar-text a:focus {
  color: #d5e7cc; 
}
.navbar .navbar-nav .nav-link {
  color: #ecf0f1;
  border-radius: .25rem;
  margin: 0 0.25em;
}
.navbar .navbar-nav .nav-link:not(.disabled):hover,
.navbar .navbar-nav .nav-link:not(.disabled):focus {
  color: #d5e7cc;
}
.navbar .navbar-nav .dropdown-menu {
  background-color: #85b797;
  border-color: #499b41;
}
.navbar .navbar-nav .dropdown-menu .dropdown-item {
  color: #ecf0f1;
}
.navbar .navbar-nav .dropdown-menu .dropdown-item:hover,
.navbar .navbar-nav .dropdown-menu .dropdown-item:focus,
.navbar .navbar-nav .dropdown-menu .dropdown-item.active {
  color: #d5e7cc;
  background-color: #499b41;
}
.navbar .navbar-nav .dropdown-menu .dropdown-divider {
  border-top-color: #499b41;
}
.navbar .navbar-nav .nav-item.active .nav-link,
.navbar .navbar-nav .nav-item.active .nav-link:hover,
.navbar .navbar-nav .nav-item.active .nav-link:focus,
.navbar .navbar-nav .nav-item.show .nav-link,
.navbar .navbar-nav .nav-item.show .nav-link:hover,
.navbar .navbar-nav .nav-item.show .nav-link:focus {
  color: #d5e7cc;
  background-color: #499b41;
}
.navbar .navbar-toggler {
  border-color: #499b41;
}
.navbar .navbar-toggler:hover,
.navbar .navbar-toggler:focus {
  background-color: #499b41;
}
.navbar .navbar-toggler .navbar-toggler-icon {
  color: #ecf0f1;
}
.navbar .navbar-collapse,
.navbar .navbar-form {
  border-color: #ecf0f1;
}
.navbar .navbar-link {
  color: #ecf0f1;
}
.navbar .navbar-link:hover {
  color: #d5e7cc;
}

@media (max-width: 575px) {
  .navbar-expand-sm .navbar-nav .show .dropdown-menu .dropdown-item {
    color: #ecf0f1;
  }
  .navbar-expand-sm .navbar-nav .show .dropdown-menu .dropdown-item:hover,
  .navbar-expand-sm .navbar-nav .show .dropdown-menu .dropdown-item:focus {
    color: #d5e7cc;
  }
  .navbar-expand-sm .navbar-nav .show .dropdown-menu .dropdown-item.active {
    color: #d5e7cc;
    background-color: #499b41;
  }
}

@media (max-width: 767px) {
  .navbar-expand-md .navbar-nav .show .dropdown-menu .dropdown-item {
    color: #ecf0f1;
  }
  .navbar-expand-md .navbar-nav .show .dropdown-menu .dropdown-item:hover,
  .navbar-expand-md .navbar-nav .show .dropdown-menu .dropdown-item:focus {
    color: #d5e7cc;
  }
  .navbar-expand-md .navbar-nav .show .dropdown-menu .dropdown-item.active {
    color: #d5e7cc;
    background-color: #499b41;
  }
}

@media (max-width: 991px) {
  .navbar-expand-lg .navbar-nav .show .dropdown-menu .dropdown-item {
    color: #ecf0f1;
  }
  .navbar-expand-lg .navbar-nav .show .dropdown-menu .dropdown-item:hover,
  .navbar-expand-lg .navbar-nav .show .dropdown-menu .dropdown-item:focus {
    color: #d5e7cc;
  }
  .navbar-expand-lg .navbar-nav .show .dropdown-menu .dropdown-item.active {
    color: #d5e7cc;
    background-color: #499b41;
  }
}

@media (max-width: 1199px) {
  .navbar-expand-xl .navbar-nav .show .dropdown-menu .dropdown-item {
    color: #ecf0f1;
  }
  .navbar-expand-xl .navbar-nav .show .dropdown-menu .dropdown-item:hover,
  .navbar-expand-xl .navbar-nav .show .dropdown-menu .dropdown-item:focus {
    color: #d5e7cc;
  }
  .navbar-expand-xl .navbar-nav .show .dropdown-menu .dropdown-item.active {
    color: #d5e7cc;
    background-color: #499b41;
  }
}

.navbar-expand .navbar-nav .show .dropdown-menu .dropdown-item {
  color: #ecf0f1;
}
.navbar-expand .navbar-nav .show .dropdown-menu .dropdown-item:hover,
.navbar-expand .navbar-nav .show .dropdown-menu .dropdown-item:focus {
  color: #d5e7cc;
}
.navbar-expand .navbar-nav .show .dropdown-menu .dropdown-item.active {
  color: #d5e7cc;
  background-color: #499b41;
}
/* navigation bar */

/*------------------------------------
- COLOR primary
------------------------------------*/
.alert-primary {
    color: #1a2408;
    background-color: #c5e68c;
    border-color: #bde27c;
}

.alert-primary hr {
    border-top-color: #b2dd67;
}

.alert-primary .alert-link {
    color: #000000;
}

.badge-primary {
    color: #fff;
    background-color: 62891E;
}

.badge-primary[href]:hover, .badge-primary[href]:focus {
    color: #fff;
    background-color: #445f14;
}

.bg-primary {
    background-color: 62891E !important;
}

a.bg-primary:hover, a.bg-primary:focus,
button.bg-primary:hover,
button.bg-primary:focus {
    background-color: #445f14 !important;
}

.border-primary {
    border-color: 62891E !important;
}

.btn-primary {
    color: #fff;
    background-color: 62891E;
    border-color: 62891E;
}

.btn-primary:hover {
    color: #fff;
    background-color: #4d6b17;
    border-color: #445f14;
}

.btn-primary:focus, .btn-primary.focus {
    box-shadow: 0 0 0 0.2rem rgba(98, 137, 30, 0.5);
}

.btn-primary.disabled, .btn-primary:disabled {
    color: #fff;
    background-color: 62891E;
    border-color: 62891E;
}

.btn-primary:not(:disabled):not(.disabled):active, .btn-primary:not(:disabled):not(.disabled).active, .show > .btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #445f14;
    border-color: #3b5212;
}

.btn-primary:not(:disabled):not(.disabled):active:focus, .btn-primary:not(:disabled):not(.disabled).active:focus, .show > .btn-primary.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem rgba(98, 137, 30, 0.5);
}

.btn-outline-primary {
    color: 62891E;
    background-color: transparent;
    border-color: 62891E;
}

.btn-outline-primary:hover {
    color: #fff;
    background-color: 62891E;
    border-color: 62891E;
}

.btn-outline-primary:focus, .btn-outline-primary.focus {
    box-shadow: 0 0 0 0.2rem rgba(98, 137, 30, 0.5);
}

.btn-outline-primary.disabled, .btn-outline-primary:disabled {
    color: 62891E;
    background-color: transparent;
}

.btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active, .show > .btn-outline-primary.dropdown-toggle {
    color: #fff;
    background-color: 62891E;
    border-color: 62891E;
}

.btn-outline-primary:not(:disabled):not(.disabled):active:focus, .btn-outline-primary:not(:disabled):not(.disabled).active:focus, .show > .btn-outline-primary.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem rgba(98, 137, 30, 0.5);
}

.list-group-item-primary {
    color: #1a2408;
    background-color: #bde27c;
}

.list-group-item-primary.list-group-item-action:hover, .list-group-item-primary.list-group-item-action:focus {
    color: #1a2408;
    background-color: #b2dd67;
}

.list-group-item-primary.list-group-item-action.active {
    color: #fff;
    background-color: #1a2408;
    border-color: #1a2408;
}

.table-primary,
.table-primary > th,
.table-primary > td {
    background-color: #bde27c;
}

.table-hover .table-primary:hover {
    background-color: #b2dd67;
}

.table-hover .table-primary:hover > td,
.table-hover .table-primary:hover > th {
    background-color: #b2dd67;
}

.text-primary {
    color: 62891E !important;
}

a.text-primary:hover, a.text-primary:focus {
    color: #445f14 !important;
}

</style>