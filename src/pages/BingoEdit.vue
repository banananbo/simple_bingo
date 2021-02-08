<template>
<section>
      <div class="container-fluid text-center">
        <div class="row">
          <div class="col-md-9 col-sm-12">
            <div id="top_area">
             <h5>{{$t("lead.create_bingo")}}</h5> 
              <section id="cell_size_input" style="padding:10px">
                {{$t("lead.cell_num")}}：
                <select name='cell_num' v-model='cell_num' @change="initBingo()" style="font-size:1.2em;width:100px;padding:5px;margin-right:50px">
                  <option v-for="num,idx in cell_nums" :key="idx"> {{num}} </option>
                </select>
                <button type="button" class="btn btn-primary" @click="resetBingo">{{$t("function.regenerate")}}</button>
              </section>

            </div>
            <div v-if="this.bingo">
              <BingoView :bingo="this.bingo" :size="size" @cellClick='onCellClicked'></BingoView>
            </div>
            <p>{{$t("message.bingo_create")}}</p>
            <button type="button" class="btn btn-primary" @click="startBingoGame">{{$t("function.start")}}</button>
          </div>
          <CellEdit :bingo="this.bingo" v-if="showModal" @close="showModal = false" :cell="editCell" @selected="cellChanged" @cancel="showModal=false"></CellEdit>
         </div>
      </div>
</section>
</template>

<script lang="ts">

import Vue from "vue" 
import BingoView from "@organisms/BingoView.vue";
import CellEdit from "@organisms/CellEdit.vue";
import {Content} from "@lib/bingo/content";
import {Bingo,Cell} from "@lib/bingo/Bingo";

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
  data:function():DataType {
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
    },
    resetBingo: function(){
      this.bingo = Bingo.createNew(this.cell_num,true);
    },
  },
  watch: {
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
  },
  mounted(){
  },
  components: {
    BingoView,
    CellEdit,
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