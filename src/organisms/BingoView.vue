<template>
<table>
    <tr v-for="(row, index1) in bingo.cells_multi" :key="index1">
        <td v-for="(cell, index2) in row" :key="index2">
            <CellView :size="cell_size" :cell="cell" @cellClick='onCellClicked' :show_title="cell_size>100"></CellView>
        </td>
    </tr>
</table>
</template>
<script lang="ts">
import Vue from "vue"
import CellView from "@organisms/CellView.vue";
import {Bingo} from "@lib/bingo/Bingo";
import {Content} from "@lib/bingo/content";

export type DataType ={
}

export default Vue.extend({

    data:function():DataType {
        return {
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
        }
    },

    computed:{
      cell_size:function():number{
          return Math.floor(this.size/this.bingo.cell_num);
      },
  },

    components: {
    CellView,
    },

    created(){

    },

    mounted(){
    },

    methods: {
        onCellClicked:function(obj:any){
            this.$emit('cellClick',obj);
        },
  },
});
</script>
<style scoped>
table {
  border: 1px solid #b1c12c;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 6px;
  overflow: hidden;
  background-color: #e8f5d0;
}
</style>