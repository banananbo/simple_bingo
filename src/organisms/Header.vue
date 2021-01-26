<template>
      <div class="navbar fixed-top">
      <a class="navbar-brand" href="#">
        <img src="https://banananbo.github.io/simple_bingo/public/img/contents/001.png" style="width:30px;height:30px">
        ぷらっとビンゴ
      </a>
      <span>{{ this.$store.state.user.name}} </span>
    　</div>
</template>
<script lang="ts">
import Vue from "vue"

export type DataType ={
}

export default Vue.extend({

});
</script>
<style scoped>
  .navbar{
    padding:4px 16px;
  }

</style>