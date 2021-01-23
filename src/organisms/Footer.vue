<template>
    <nav class="navbar navbar-dark bg-dark fixed-bottom navbar-light bg-light">
      <!-- <router-link to="/create">再作成</router-link> -->
        <ul class="nav-list">
    <li class="nav-item">
      <a href="#"  @click.prevent.stop="$router.push('/')">
        <v-fa icon="home" />
        <span>HOME</span>
      </a>
    </li>
    <li class="nav-item">
      <a href="#" @click.prevent.stop="$router.push('/game')">
        <v-fa icon="th" />
        <span>PLAY</span>
      </a>
    </li>
    <li class="nav-item">
      <a href="#"  @click.prevent.stop="$router.push('/result')">
        <v-fa icon="list" />
        <span>History</span>
      </a>
    </li>
    <li class="nav-item">
      <a href="#"  @click.prevent.stop="$router.push('/archives')">
        <v-fa icon="list" />
        <span>みんな</span>
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

  }
});
</script>
<style scoped>
.navbar{
    padding:0;
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
</style>