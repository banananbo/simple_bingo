<template>
  <div class="modal-mask" @click="closeModal">
    <div class="modal-wrapper">
      <div class="modal-container" @click="(event)=>{ event.stopPropagation(); }">
        <div class="modal-body rounded">
            <p v-if="cell.content.title" class="title">{{cell.content.title}}</p>
            <div class="inline-block" style="float: left">
              <ContentView :size="100" :content="cell.content"></ContentView>
            </div>
            <div v-if="cell.content.caption" class="inline-block" style="width:150px">
              {{cell.content.caption}}{{checkstr}}-
            </div>
            <div class="text-center" style="clear:both; padding: 5px">
              <button class="btn btn-primary" v-if="!cell.checked" @click="submitContent">{{checkstr}}</button>
              <button class="btn btn-primary" v-if="!cell.checked" @click="cancelContent">まだ</button>
              <p v-if="cell.checked">{{format_to_date(cell.checkInfo.time)}} {{$t("function.found")}}</p>
              <button class="btn btn-primary" v-if="cell.checked" @click="cancelContent">{{$t("function.cancel")}}</button>
              <button class="btn btn-primary" v-if="cell.checked" @click="closeModal">{{$t("function.close")}}</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

import Vue from "vue"
import {Cell} from "@lib/bingo/Cell";
import ContentView from "@organisms/ContentView.vue";

export type DataType ={
    
}

export default Vue.extend({
    data:function():DataType {
        return {

        };
    },
    props: {
        cell: Cell,
        checkstr: {
            type: String,
            required: true,
            default: "default"
        },
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
        closeModal:function(){
          this.$emit('close');
        }
  },
});
</script>
<style scoped>
.inline-block {
    /* display: inline-block; */
    float: left;
}
.title {
  font-weight: bold;
  font-size: 1.2 em;
  width: 100%;
  color: #010079;
  text-shadow: 0 0 5px white;
  padding: 0.3em 0.5em;
  background: -webkit-repeating-linear-gradient(-45deg, #cce7ff, #cce7ff 3px,#e9f4ff 3px, #e9f4ff 7px);
  background: repeating-linear-gradient(-45deg, #cce7ff, #cce7ff 3px,#e9f4ff 3px, #e9f4ff 7px);
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
  overflow: auto;
}

.modal-container {
  overflow: auto;
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
  overflow: auto;
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