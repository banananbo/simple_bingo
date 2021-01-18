<template>
<div>
    <table>
        <tr v-for="(row, index1) in bingo.cells" :key="index1">
            <td v-for="(cell, index2) in row" :key="index2">
                <CellView :size="cell_size" :cell="cell" @cellClick='onCellClicked'></CellView>
            </td>
        </tr>
    </table>
</div>
</template>
<script lang="ts">
import Vue from "vue"
import CellView from "./CellView.vue";
import {Bingo} from "./Bingo.ts";
import {Content} from "./content.ts";

export type DataType ={
}

export default Vue.extend({

    data(): DataType {
        return {
        };
    },

    props: {
        cell_size: {
            type: Number,
            required: true
        },
        // contents: {
        //     type: Array,
        //     required: true
        // },
        bingo: {
            type: Bingo,
            required: true
        }
    },

    components: {
    CellView
    },

    created(){

    },

    mounted(){
        // this.canvas = <HTMLCanvasElement>document.getElementById( "target" );
        // this.refleshBingo();
    },

    methods: {
        onCellClicked:function(obj:any){
            this.$emit('cellClick',obj);
        },
  },
});
</script>
<style scoped>

</style>