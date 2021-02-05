<template>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

     <div class="modal-body rounded">
         <h5>{{$t("message.finish_bingo")}}</h5>
         <p style='font-size: 0.8em'>{{$t("message.finish_bingo_caption")}}</p>
         <h6>{{$t("noun.record")}}</h6>
            <table>
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
            </table>
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
ContentView
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

table{
  width: 100%;
  border-collapse:separate;
  border-spacing: 0;
  padding: 5px 20px;
}

table th:first-child{
  border-radius: 5px 0 0 0;
}

table th:last-child{
  border-radius: 0 5px 0 0;
  border-right: 1px solid #3c6690;
}

table th{
  text-align: center;
  color:white;
  background: linear-gradient(#829ebc,#225588);
  border-left: 1px solid #3c6690;
  border-top: 1px solid #3c6690;
  border-bottom: 1px solid #3c6690;
  box-shadow: 0px 1px 1px rgba(255,255,255,0.3) inset;
  width: 25%;
  padding: 5px 0;
  font-size: 80%;
}

table td{
  text-align: center;
  border-left: 1px solid #a8b7c5;
  border-bottom: 1px solid #a8b7c5;
  border-top:none;
  box-shadow: 0px -3px 5px 1px #eee inset;
  width: 25%;
  padding: 10px 0;
}

.big{
    font-size: 140%;
    /* font-weight: 600; */
    font-family: Impact,Charcoal;
}

table td:last-child{
  border-right: 1px solid #a8b7c5;
}

table tr:last-child td:first-child {
  border-radius: 0 0 0 5px;
}

table tr:last-child td:last-child {
  border-radius: 0 0 5px 0;
}
</style>