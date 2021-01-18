<template>
<div>
  <button @click="openModal">Open</button>
  <p>test
    dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>
    dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>
    dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>
  </p>
  <div v-if="showModal" class="mymodal">
     <div class="modal__bg js-modal-close"></div>
     <div class="modal__content">
      <div v-for="(content, index) in contents" :key="index" class="box">
            <CellView :content='content' :size="100" :canvasid="'canvas'+index"></CellView>
      </div>
          dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>
          dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>
          dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>
          dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>dummy<br>
      <button @click="closeModal">Close</button>
     </div>
  </div>
</div>
</template>

<script lang="ts">

import Vue from "vue"
import CellView from "./CellView.vue";
import {Content} from "./content.ts"


export type DataType ={
  contents: Array<Content>,
  showModal: Boolean
}

export default Vue.extend({
    data(): DataType {
        return {
            contents: Content.contents,
            showModal: true
        };
    },
  components: {
    CellView
  },
  methods:{
    openModal:function(){
      this.showModal = true;
    },
    closeModal:function(){
      this.showModal = false;
    },
  }
})
</script>
<style scoped>
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
</style>