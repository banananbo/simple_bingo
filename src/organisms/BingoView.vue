<template>
<!-- <table>
    <tr v-for="(row, index1) in bingo.cells_multi" :key="index1">
        
        <td v-for="(cell, index2) in row" :key="index2">
            <draggable :options="options" @end="ondraggend" :move="()=> false">
            <CellView :size="cell_size" :cell="cell" @cellClick='onCellClicked' :show_title="cell_size>100" :playing="bingo.is_playing"></CellView>
            </draggable>
        </td>
</tr>
</table> -->
            <draggable v-model="bingo.cells" :style="draggable_style" element="ul" :options="options" @end="ondraggend" :move="handleMove">
            <li v-for="(cell, index) in bingo.cells" :key="index">
                <CellView :size="cell_size" :cell="cell" @cellClick='onCellClicked' :show_title="cell_size>100" :playing="bingo.is_playing"></CellView>
            </li>
            </draggable>
</template>
<script lang="ts">
import Vue from "vue"
import CellView from "@organisms/CellView.vue";
import {Bingo} from "@lib/bingo/Bingo";
import {Content} from "@lib/bingo/content";
 import draggable from 'vuedraggable'

export type DataType ={
    options: any,
    movingIndex: any,
    futureIndex: any,
}

export default Vue.extend({

    data:function():DataType {
        return {
            options: {
                animation: 200,
                group: 'cell',
                disabled: !this.draggable
            },
            movingIndex: null,
            futureIndex: null,

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
        return this.cell_size*this.bingo.cell_num+6
      },
      cell_size:function():number{
          return Math.floor((this.size-6)/this.bingo.cell_num);
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
        draggable
    },

    created(){

    },

    mounted(){
    },

    methods: {
        ondraggend:function(event:any){
            this.bingo.cells[this.movingIndex].swapContents(this.bingo.cells[this.futureIndex]);
        },
        handleMove(event:any) {
            console.log(event.draggedContext);
            const { index, futureIndex } = event.draggedContext
            this.movingIndex = index
            this.futureIndex = futureIndex
            return false // disable sort
        },
        onCellClicked:function(obj:any){
            this.$emit('cellClick',obj);
        },
  },
});
</script>
<style scoped>

/* .grid-container {
  display: grid;
  grid-template-columns: repeat(3, 139px);
  gap: 2px;
} */

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