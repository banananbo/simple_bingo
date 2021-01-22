<template>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

     <div class="modal-body rounded">
         <ContentView :size="100" :content="cell.content"></ContentView>
         <p>{{cell.content.title}}</p>
         <p v-if="cell.checked">{{cell.check_time}}に発見</p>
         <div class="text-center">
          <button v-if="!cell.checked" @click="submitContent">見つけた！</button>
          <button v-if="!cell.checked" @click="cancelContent">まだ</button>
          <button v-if="cell.checked" @click="cancelContent">とりけす</button>
         </div>
    </div>

            </div>
          </div>
        </div>
      </transition>
</template>
<script lang="ts">

import Vue from "vue"
import {Bingo,Cell} from "./Bingo.ts";
import Header from "./Header.vue";
import BingoView from "./BingoView.vue";
import ContentView from "./ContentView.vue";

export type DataType ={
    
}

export default Vue.extend({
    data(): DataType {
        return {

        };
    },

    props: {
        cell:Cell
    },
    mounted(){
    },

    components: {
ContentView
    },

    methods: {
        submitContent:function(){
            this.$emit('submit',{cell:this.cell});
        },
        cancelContent:function(){
            this.$emit('cancel',{cell:this.cell});
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