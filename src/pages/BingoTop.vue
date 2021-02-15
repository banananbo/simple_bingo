<template>
<section>
      <div class="container-fluid text-center">
          <a href="https://www.amazon.co.jp/dp/4873115655?&linkCode=li2&tag=banananbo01-22&linkId=bb0f701e4412fb2d1ef984f3e5e554c3&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4873115655&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=banananbo01-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=banananbo01-22&language=ja_JP&l=li2&o=9&a=4873115655" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
          <ul>
              <li>ビンゴをプレイ</li>
              <li>ビンゴを作る</li>
          </ul>
      </div>
</section>
</template>

<script lang="ts">

import Vue from "vue" 
import BingoView from "@organisms/BingoView.vue";
import CellEdit2 from "@organisms/CellEdit2.vue";
import {Content} from "@lib/bingo/content";
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
    // CellEdit,
    CellEdit2
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