<template>
    <section>
        <Header></Header>
        <div id="main">
         <router-view></router-view>
        </div>
        <Footer></Footer>
    </section>
</template>
<script lang="ts">
import Vue from "vue"
import Footer from "@organisms/yome/Footer.vue";
import Header from "@organisms/yome/Header.vue";

export default Vue.extend({

components:{
        Footer,
        Header
      }
})

</script>
<style scoped>
section{
  padding: 0 5px;        /* 余白の削除 */
  background-color: #d0d8d2;
  background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23929f92' fill-opacity='0.23'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
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
  background-color: #5F8794;
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
</style>