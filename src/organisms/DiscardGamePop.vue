<template>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

     <div class="modal-body rounded">
         <h5>{{$t("message.finish_bingo_alert")}}</h5>
         <h6>{{$t("noun.record")}}</h6>
         <ScoreView :bingo="$store.state.bingo" :timer="$store.state.bingo.current_time_str"></ScoreView>
         <!-- <ul>
              <li class="list-group-item">{{$t("noun.score")}}:{{$store.state.bingo.score}}</li>
              <li class="list-group-item">{{$t("noun.bingo")}}:{{$store.state.bingo.bingonum}}</li>
         </ul> -->
         <div class="text-center">
          <button class="btn btn-danger" @click="discardGame">{{$t("function.remove")}}</button>
          <button class="btn btn-primary" @click="cancelDiscard">{{$t("function.continue")}}</button>
         </div>
    </div>

            </div>
          </div>
        </div>
      </transition>
</template>
<script lang="ts">

import Vue from "vue"
import ScoreView from "@atoms/ScoreView.vue";

export type DataType ={
    
}

export default Vue.extend({
    data:function():DataType {
        return {

        };
    },

    props: {

    },
    mounted(){
    },

    components: {
      // ContentView,
      ScoreView
    },

    methods: {
        discardGame:function(){
            this.$store.commit('discardPlayingGame');
            this.$emit('discard');
        },
        cancelDiscard:function(){
            this.$emit('cancel');
        },
  },
});
</script>
<style scoped>
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
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
/* 
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
} */
</style>