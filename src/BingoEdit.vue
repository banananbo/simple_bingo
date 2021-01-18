<template>
<section>
      <div class="container-fluid text-center">
        <div class="row">
          <div class="col-md-9 col-sm-12">
            <div id="top_area">
              <h2 class="page_title">ビンゴを作る</h2>
              <section id="cell_size_input">
                セルの数：<input v-model="cell_num" type="number" min="3" max="8">
                <button>OK</button>
              </section>
            </div>

            <div>
              <BingoView :contents="contents" :cell_size="cell_size" @cellClick='onCellClicked'></BingoView>
            </div>
          </div>
          <button id="show-modal" @click="showModal = true">Show Modal</button>
          <div class="sidebar_fixed no-print card col-md-3 col-sm-12 p-3 mb-2 bg-primary text-white" >
            <ul class="no-print">
              <li>サイズ：<input v-model="size" type="number" min="200" max="1000" step="50"></li>
              <li>セルの数：<input v-model="cell_num" type="number" min="3" max="8"></li>
            </ul>
          </div>
          <CellEdit v-if="showModal" @close="showModal = false" :cell="editCell" @selected="cellChanged"></CellEdit>
         </div>
      </div>
</section>
</template>

<script lang="ts">

import Vue from "vue" 
import BingoView from "./BingoView.vue";
import CellEdit from "./CellEdit.vue";
import Cell from "./Cell.vue";
import {Content} from "./content.ts";

Vue.component("modal", {
  template: "#modal-template"
});

export type DataType ={
  size : number,
  cell_num: number,
  showModal: Boolean,
  contents: Array<Array<Content>>,
  editCell: any
}

export default Vue.extend({
  data(): DataType {
    return {
      size: screen.width - 40,
      cell_num: 3,
      showModal: false,
      editCell: null,
      contents: []
    };
  },
  methods:{
    onCellClicked:function(obj:any){
      console.log(obj.cell.content.title);
      this.editCell = obj.cell;
      this.showModal = true;
    },
    cellChanged:function(){
      this.showModal = false;
    },
    initBingo: function(){
      this.contents = [];
      for(let i=0; i<this.cell_num;i++){
          let horizontal:Array<Content> = [];
          for(let j=0; j<this.cell_num; j++){
          horizontal.push(Content.random);
          }
          this.contents.push(horizontal);
      }
  },
  watch: {
      'size': {
          handler: function () {
              this.initBingo();
          }
      },
      'cell_num': {
          handler: function () {
              this.initBingo();
          }
      }
    },
  },
  computed:{
      cell_size:function():number{
          return Math.floor(this.size/this.cell_num);
      }
  },
  created() { 
  },
  mounted(){
    this.initBingo();
  },
  components: {
    BingoView,
    CellEdit
  }
})
</script>
<style>
#top_area{
position: relative;
padding-top: 50px;
}
#cell_size_input{
  position: absolute;
  top: 10px;
  right: 10px;
}
.page_title{
  position: absolute;
  top: 10px;
  left: 5px;
}
.sidebar_fixed {
  position: sticky;
  height: 150px;
  top: 60px;
}
.sidebar_content {
  margin-bottom: 100px;
}
@media print{
  .no-print{
    display: none;
  }
}
</style>