<template>
      <div class="navbar fixed-top shadow text-center justify-content-center">
        <!-- <img src="https://banananbo.github.io/simple_bingo/public/img/contents/001.png" style="width:30px;height:30px"> -->
        <span class="title">{{$store.state.yome.tool_title}}</span>
        <!-- <button class='btn' @click="openSettingPop"><v-fa icon="cog" /> </button> -->
        <!-- <SettingPop v-if="settingPop" :user="$store.state.user.user" :allow_location='$store.state.user_setting.allow_location' @close="closeSettingPop"></SettingPop> -->
    　</div>
</template>
<script lang="ts">
import Vue from "vue"
import SettingPop from "@organisms/SettingPop.vue";

export type DataType ={
  settingPop:boolean
}

export default Vue.extend({
      data:function():DataType {
        return {
          settingPop: false
        };
    },
    created(){
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
      },
      onTitleClicked(){
        if (this.$route.path == "/") return;
        this.$router.push("/");
      }
    },
});
</script>
<style scoped>
  .navbar{
    padding:4px 16px;
  }
  .navbar-brand{
    font-weight: bolder;
  }
  .title{
    padding: 4px;
    font-weight: bold;
    font-size:1.3em;
    color: #FFF;
  }
</style>