<template>
    <draggable v-model="bingo.cells" :style="draggable_style" element="ul" :options="options" @start="ondraggstart" @end="ondraggend" :move="handleMove">
    <li v-for="(cell, index) in bingo.cells" :key="index">
        <CellView :size="cell_size" :cell="cell" @cellClick='onCellClicked' :show_title="cell_size>100" :playing="bingo.is_playing"></CellView>
    </li>
    </draggable>
</template>
<script lang="ts">
import Vue from "vue"
import CellView from "@organisms/CellView.vue";
import ContentView from "@organisms/ContentView.vue";
import {Bingo} from "@lib/bingo/Bingo";
import {Cell} from "@lib/bingo/Cell";
import {Content} from "@lib/bingo/content";
 import draggable from 'vuedraggable'

export type DataType ={
    options: any,
    movingCell: Cell,
    futureCell: Cell
}

export default Vue.extend({

    data:function():DataType {
        return {
            options: {
                animation: 200,
                delay: 200,
                group: 'cell',
                disabled: !this.draggable
            },
            movingCell: null,
            futureCell: null

        };
    },

    props: {
        size: {
            type: Number,
            required: true
        },
        bingo: {
            type: Bingo,
            required: false
        },
        draggable: {
            type: Boolean,
            required: false,
            default: false
        },
    },

    computed:{
      bingo_size:function():number{
        return this.cell_size*this.bingo.cell_num + 4
      },
      cell_size:function():number{
          return (this.size-4)/this.bingo.cell_num;
      },
        draggable_style:function():any {
            return{
                'width': `${this.bingo_size}px`,
                'list-style': 'none',
                'padding': '0 0',
                display: "grid",
                "grid-template-columns": `repeat(${this.bingo.cell_num}, ${this.cell_size}px)`,
                gap: "0px",
            }
        }
  },

    components: {
        CellView,
        draggable,
        ContentView
    },

    created(){

    },

    mounted(){
    },

    methods: {
        ondraggend:function(e:any){
            console.log("swap swap");
            if(!this.movingCell||!this.futureCell) return;
            this.movingCell.swapContents(this.futureCell);
            this.movingCell = null;
            this.futureCell = null;
        },
        ondraggstart:function(e:any){
            console.log("drag start");
            console.log(e.item);
            let li = e.item;
            li.addEventListener( "mousemove", () =>{ console.log(99) } ) ;
            
            this.movingCell = this.bingo.cells[e.oldIndex];
            // this.movingCell.content = Content.BLANK;
            // this.bingo.cells[e.oldIndex].content  = Content.BLANK;
        },
        handleMove(event:any) {
            
            const { index, futureIndex } = event.draggedContext

            // this.movingContent = this.bingo.cells[this.movingIndex].content;
            this.futureCell = this.bingo.cells[futureIndex];

            // this.bingo.cells[this.movingIndex].content = Content.BLANK;
            return false // disable sort
        },
        onCellClicked:function(obj:any){
            this.$emit('cellClick',obj);
        },
  },
});
</script>
<style scoped>

ul {
  border: 3px solid #b1c12c;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 6px;
  /* overflow: hidden; */
  background-color: #ffffff;
  align-items: center;
  text-align: center;
}
</style>