<template>
<section>
      <div class="container-fluid text-center">
        <div class="row">
          <div class="col-md-9 col-sm-12">
            <div id="top_area">
             <h5>{{$t("lead.create_bingo")}}</h5> 
            </div>
            <div v-if="this.bingo">
              <BingoView :bingo="this.bingo" :size="size" @cellClick='onCellClicked' :draggable="true"></BingoView>
            </div>
            <p>{{$t("message.bingo_create")}}</p>
            <button type="button" class="btn btn-primary" @click="startBingoGame">{{$t("function.start")}}</button>
          </div>
          <ACellEdit :bingo="this.bingo" v-if="showModal" @close="showModal = false" :cell="editCell" @selected="cellChanged" @cancel="showModal=false"></ACellEdit>
         </div>
      </div>
</section>
</template>

<script lang="ts">

import Vue from "vue" 
import BingoView from "@organisms/BingoView.vue";
import ACellEdit from "@organisms/ACellEdit.vue";
import {Content,AContent} from "@lib/bingo/content";
import {Bingo} from "@lib/bingo/Bingo";
import {Cell} from "@lib/bingo/Cell";

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
      size: screen.width - 20,
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
      // this.bingo =  new Bingo( Cell.createByRandomMitsuketaContents(  this.cell_num ) );
          //       let cells:Cell[] = [ 
          //     new Cell(new AContent("4873115655")),
          //     new Cell(new AContent("B07HQ58BLM")),
          //     new Cell(new AContent("4774142042")),
          //     new Cell(new AContent("4274068560")),
          //     new Cell(new AContent("4822248976")),
          //     new Cell(new AContent("B00UX9VJGW")),
          //     new Cell(new AContent("B00GRKD6XU")),
          //     new Cell(new AContent("4048930656")),
          //     new Cell(new AContent("477419218X")),
          // ];
          // this.bingo = new Bingo(cells);
          this.bingo =  new Bingo( Cell.createBlankCell(3));
    },
    startBingoGame:function(){
      this.$store.commit('setBingoData',this.bingo);
      this.$router.push('game');
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
    ACellEdit
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