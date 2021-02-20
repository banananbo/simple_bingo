<template>
<section>
      <div class="container-fluid text-center">
        <div class="row">
          <div class="col-md-9 col-sm-12">
            <div v-if="this.bingo">
              <BingoView :bingo="bingo" :size="size" @cellClick='onCellClicked' :draggable="true"></BingoView>
            </div>
            <div style="margin:10px">
              
              
            </div>
            <dl>
              <dt>ビンゴタイトル</dt>
              <dd><input type="text"  v-model="bingo.title" style="margin:10px" /></dd>
              <dt>せつめい</dt>
              <dd><textarea class="description" v-model="bingo.description" maxlength="100" ></textarea></dd>
            </dl>
            <button type="button" class="btn btn-primary" @click="saveTemplate">ビンゴを作成！</button>
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
import { DBBingos } from "@src/lib/db/dbbingos";


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
        this.bingo =  new Bingo( Cell.createBlankCell(3));
    },
    saveTemplate:async function(){
      let db:DBBingos = new DBBingos(DBBingos.DOC_AMAZON_TEMPLATE);
      let newId:string = await db.addBingo(this.bingo);
      this.bingo.id = newId;
      this.$store.commit('yome/addToMyTemplate',this.bingo);
      this.$router.push(`/yome/template/`+newId);
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
    this.initBingo();
    this.$store.commit('yome/setTitle',"ビンゴをつくる");
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
.description{
  width: 100%;
}
@media print{
  .no-print{
    display: none;
  }

}
</style>