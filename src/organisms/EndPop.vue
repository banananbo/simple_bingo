<template>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

     <div class="modal-body rounded">
         <h5>{{$t("message.finish_bingo")}}</h5>
         <p style='font-size: 0.8em'>{{$t("message.finish_bingo_caption")}}</p>
         <h6>{{$t("noun.record")}}</h6>
            <!-- <table>
                <tr>
                    <th>{{$t("noun.score")}}</th>
                    <th>{{$t("noun.bingo")}}</th>
                    <th>{{$t("noun.time")}}</th>
                </tr>
                <tr>
                    <td class="big">{{this.$store.state.bingo.score}}</td>
                    <td class="big">{{this.$store.state.bingo.bingonum}}</td>
                    <td>{{timer}}</td>
                </tr>
            </table> -->
            <ScoreView :bingo="this.bingo" :timer="this.timer"></ScoreView>
            <h6>{{$t("noun.memo")}}</h6>
         <div class="text-center">
            <textarea v-model="bingo.memo" style="width:80%" maxlength='100'></textarea>
         </div>
         <div class="text-center">
          <button class="btn btn-primary" @click="submitContent">{{$t("function.finish")}}</button>
          <button class="btn btn-danger" @click="removeContent">{{$t("function.remove")}}</button>
          <button class="btn btn-primary" @click="cancelContent">{{$t("function.continue")}}</button>
         </div>
    </div>

            </div>
          </div>
        </div>
      </transition>
</template>
<script lang="ts">

import Vue from "vue"
import {Bingo,Cell} from "@lib/bingo/Bingo";
import ContentView from "@organisms/ContentView.vue";
import ScoreView from "@atoms/ScoreView.vue";

export type DataType ={
    
}

export default Vue.extend({
    data:function():DataType {
        return {

        };
    },

    props: {
        bingo:Bingo,
        timer:String
    },
    mounted(){
    },

    components: {
      ContentView,
      ScoreView
    },

    methods: {
        submitContent:function(){
            this.$emit('submit');
        },
        cancelContent:function(){
            this.$emit('cancel');
        },
        removeContent:function(){
            this.$emit('remove');
        },
  },
});
</script>
<style scoped>
button{
  margin: 5px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 5px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 10px 0;
}

.modal-default-button {
  float: right;
}
</style>