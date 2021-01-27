<template>
      <div class="navbar fixed-top">
        <a class="navbar-brand" href="#">
          <img src="https://banananbo.github.io/simple_bingo/public/img/contents/001.png" style="width:30px;height:30px">
          ぷらっとビンゴ
        </a>
        <button class='btn' @click="openSettingPop"><v-fa icon="cog" />{{ $store.state.user.name}}</button>
        <SettingPop v-if="settingPop" :user="$store.state.user" @close="closeSettingPop"></SettingPop>
    　</div>
</template>
<script lang="ts">
import Vue from "vue"
import SettingPop from "@organisms/SettingPop.vue";

export type DataType ={
  settingPop:boolean
}

export default Vue.extend({
      data(): DataType {
        return {
          settingPop: false
        };
    },
    components: {
      SettingPop
    },
    methods: {
      openSettingPop(){
        this.settingPop=true;
      },
      closeSettingPop(){
        this.settingPop=false;
      }
    },
});
</script>
<style scoped>
  .navbar{
    padding:4px 16px;
  }

</style>