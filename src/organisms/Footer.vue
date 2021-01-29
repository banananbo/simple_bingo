<template>
    <nav class="navbar fixed-bottom">
      <!-- <router-link to="/create">再作成</router-link> -->
        <ul class="nav-list">
    <li class="nav-item">
      <a href="#"  @click.prevent.stop="movePage('/')">
        <v-fa icon="home" />
        <span>{{$t("noun.home")}}</span>
      </a>
    </li>
    <li class="nav-item">
      <a href="#" @click.prevent.stop="movePage('/game')">
        <v-fa icon="th" />
        <span>{{$t("noun.bingo")}}</span>
      </a>
    </li>
    <li class="nav-item">
      <a href="#"  @click.prevent.stop="movePage('/mypage')">
        <v-fa icon="user" />
        <span>{{$t("noun.you")}}</span>
      </a>
    </li>
    <li class="nav-item">
      <a href="#"  @click.prevent.stop="movePage('/archives')">
        <v-fa icon="users" />
        <span>{{$t("noun.everyone")}}</span>
      </a>
    </li>
  </ul>
    </nav>
</template>
<script lang="ts">
import Vue from "vue"

export type DataType ={
}

export default Vue.extend({
  methods:{
    movePage(route:string){
      if (this.$route.path == route) return;
      this.$router.push(route);
    }
  }
});
</script>
<style scoped>
.navbar{
    padding:0;
    z-index: 1029;
}
.nav-item i {
  display: block;
  font-size: 24px;
}
.nav-item a span {
  display: block;
  font-size: 10px;
}

.nav-list {
  display: table;
  padding: 0;
  list-style: none;
  text-align: center;
  margin: 0px;
}
.nav-item {
  display: table-cell;
  padding: 4px 0px;
}
.nav-list {
  table-layout: fixed;
  width: 100%;
}
a:link, a:visited, a:hover, a:active {
  color: rgb(255, 255, 255);
}
</style>