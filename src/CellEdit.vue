<template>
<transition name="modal">
  <div class="mymodal">
     <div class="modal__bg"></div>
     <div class="modal__content">
      <div v-for="(content, index) in contents" :key="index" class="box">
            <ContentView :enable="!except_id_list.includes(content.id)" :content='content' :size="100" @onClick="onClicked"></ContentView>
      </div>
     </div>
  </div>
      </transition>
</template>
<script lang="ts">

import Vue from "vue"
import ContentView from "./ContentView.vue";
import {Content} from "./content.ts"
import {Bingo} from "./Bingo.ts"

export type DataType ={
      contents: Array<Content>
}

export default Vue.extend({
    data(): DataType {
        return {
            contents: Content.contents,
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
      }
    },
  components: {
    ContentView
  },
})
</script>
<style>
.mymodal{
    height: 100vh;
    position: fixed;
    top: 0;
    width: 100%;
}
.modal__bg{
    background: rgba(0,0,0,0.8);
    height: 100vh;
    position: absolute;
    width: 100%;
}
.modal__content{
    background: #fff;
    left: 50%;
    padding: 10px;
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 90%;
    overflow: auto;
    height: 80vh;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
}

.box{
  float: left;
}

.boxContainer{
  overflow: hidden;
}

.modal-dialog-fluid {
  max-width: inherit;
  width: 80%;
  margin-left: 15px;
  overflow-y: auto;
  height: 100%;
}
</style>