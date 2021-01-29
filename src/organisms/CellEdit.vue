<template>
      <transition name="modal">
        <div class="modal-mask" @click="closeModal">
          <div class="modal-wrapper">
            <div class="modal-container" @click="(event)=>{ event.stopPropagation(); }">
              <div class="modal-body rounded">
      <div v-for="(content, index) in contents" :key="index" class="box">
            <ContentView :enable="!except_id_list.includes(content.id)" :content='content' :size="size" @onClick="onClicked"></ContentView>
            <p>{{content.title}}</p>
      </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>
<script lang="ts">

import Vue from "vue"
import ContentView from "@organisms/ContentView.vue";
import {Content} from "@lib/bingo/content.ts"
import {Bingo} from "@lib/bingo/Bingo.ts"

export type DataType ={
      contents: Array<Content>,
      size: number
}

export default Vue.extend({
    data:function():DataType {
        return {
            contents: Content.contents,
            size : (screen.width -80)/4
        };
    },
   computed:{
      except_id_list():Array<number>{
          return this.bingo.contents.map(c=>c.id);
      }
  },
    props: {
        bingo: {
            type: Bingo,
            required: true
        },
    },
    methods:{
      onClicked: function(obj:any){
        this.$emit("selected",obj);
      },
      closeModal: function(){

      }
    },
  components: {
    ContentView
  },
})
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
  width: 95vw;
  height: 80vh;
  overflow: auto;
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

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */


.box{
  float: left;
}

.boxContainer{
  overflow: hidden;
}

</style>