<template>
<section>
<Header></Header>
      <div class="container-fluid text-center">
        <div class="row">
          <div class="col-md-9 col-sm-12">
            <div id="top_area">
             <h5>ビンゴを作る</h5>
              <section id="cell_size_input">
                セルの数：
                <select name='cell_num' v-model='cell_num' @change="initBingo()">
                  <option v-for="num,idx in cell_nums" :key="idx"> {{num}} </option>
                </select>
              </section>
            </div>
            <div v-if="this.bingo">
              <BingoView :bingo="this.bingo" :size="size" @cellClick='onCellClicked'></BingoView>
            </div>
            <LocationSetting></LocationSetting>
            <button type="button" class="btn btn-primary" @click="startBingoGame">ビンゴを始める</button>
          </div>
          <!-- <button id="show-modal" @click="showModal = true">Show Modal</button>
          <div class="sidebar_fixed no-print card col-md-3 col-sm-12 p-3 mb-2 bg-primary text-white" >
            <ul class="no-print">
              <li>サイズ：<input v-model="size" type="number" min="200" max="1000" step="50"></li>
              <li>セルの数：<input v-model="cell_num" type="number" min="3" max="8"></li>
            </ul>
          </div> -->
          <CellEdit :bingo="this.bingo" v-if="showModal" @close="showModal = false" :cell="editCell" @selected="cellChanged"></CellEdit>
         </div>
      </div>
      <Footer></Footer>
</section>
</template>

<script lang="ts">

import Vue from "vue" 
import BingoView from "@organisms/BingoView.vue";
import CellEdit from "@organisms/CellEdit.vue";
import Header from "@organisms/Header.vue";
import Footer from "@organisms/Footer.vue";
import {Content} from "@lib/bingo/content.ts";
import {Bingo,Cell} from "@lib/bingo/Bingo.ts";
import LocationSetting from "@atoms/LocationSetting.vue";

Vue.component("modal", {
  template: "#modal-template"
});

export type DataType ={
  size : number,
  cell_num: number,
  showModal: Boolean,
  contents: Array<Array<Content>>,
  editCell: Cell,
  cell_nums: Array<Number>,
  bingo: Bingo
}

export default Vue.extend({
  data(): DataType {
    return {
      size: screen.width - 40,
      cell_num: 3,
      showModal: false,
      editCell: null,
      contents: [],
      cell_nums: [3,4,5],
      bingo: null
    };
  },
  methods:{
    onCellClicked:function(obj:any){
      this.editCell = obj.cell;
      this.showModal = true;
    },
    cellChanged:function(obj:any){
      this.showModal = false;
      this.editCell.content = obj.content;
    },
    initBingo: function(){
      this.bingo = Bingo.createNew(this.cell_num,true);
    },
    startBingoGame:function(){
      this.$store.commit('setBingoData',this.bingo);
      this.$router.push('game');
    }
  },
  watch: {
      // 'size': {
      //     handler: function () {
      //         this.initBingo();
      //     }
      // },
      'cell_num': {
          handler: function () {
            console.log("change cell num");
            this.initBingo();
          }
      }
  },
  computed:{
      cell_size:function():number{
          return Math.floor(this.size/this.cell_num);
      },
      count():number {
          return this.$store.state.count;
      }
  },
  created() { 
    if( this.$store.state.bingo && this.$store.state.bingo.is_playing){
        this.$router.push('game');
        return;
    }
    
    this.initBingo();
    // this.cell_num = this.$store.state.bingo.cell_num;
  },
  mounted(){
    // this.initBingo();
  },
  components: {
    BingoView,
    CellEdit,
    Header,
    Footer,
    LocationSetting
  }
})
</script>
<style>
.container-fluid{
  padding: 0 0;
}
@media print{
  .no-print{
    display: none;
  }
}
</style>