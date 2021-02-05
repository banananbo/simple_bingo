<template>
  <table class="inline">
      <tr>
          <th>{{$t("noun.score")}}</th>
          <th>{{$t("noun.bingo")}}</th>
          <th>{{$t("noun.time")}}</th>
      </tr>
      <tr>
          <td class="big">{{this.bingo.score}}</td>
          <td class="big">{{this.bingo.bingonum}}</td>
          <td>{{timer}}</td>
      </tr>
  </table>
</template>
<script lang="ts">
import Vue from "vue"
import {Bingo} from "@lib/bingo/Bingo";

export type DataType ={
}

export default Vue.extend({


    data(): DataType {
        return {
        };
    },

    props: {
      timer:String,
      bingo:Bingo
    },
});
</script>
<style scoped>
#score_container{
    text-align: center;
    padding: 5px;
}

.inline{
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
}

.big{
    font-size: 200%;
    /* font-weight: 600; */
    font-family: Impact, Charcoal;
}

table{
  margin:5px auto;
  border-radius:6px;
  border: 2px solid #99b028;
  border-spacing: 0;
  overflow:hidden;
}
td,th{
  text-align: center;
}
td,th{
  padding:5px 10px;
}
th{
  background:#99b028;
  border-bottom: 2px solid #99b028;
  color:#ffffff;
}
td{
  background:#ffffff;
}
</style>