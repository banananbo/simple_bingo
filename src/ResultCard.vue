<template>
<div class="main card row" @click="toggleView">
        <div style="float:left">
            <table>
                <tr>
                    <td>
                        <CellView v-if="!detail_view" :cell="main_cell" :size="50"></CellView>
                    </td>
                    <td>
                        <span class="title">{{bingo.title}}</span>
                    </td>
                </tr>
            </table>
        </div>
        <div v-if="detail_view">
            <BingoView :bingo="bingo" :size="size"></BingoView>
            
            <div>
                <ul class="list-group list-group-horizontal  mx-auto">
                    <li class="list-group-item">score:{{bingo.score}}</li>
                    <li class="list-group-item">bingo:{{bingo.bingonum}}</li>
                    <li class="list-group-item">time:{{bingo.spentTime}}</li>
                </ul>
            </div>
            <p>{{bingo.memo}}</p>
            <ul v-for="(cell,idx) in bingo.cells_checked" :key="idx">
                <li><CellView :cell="cell" :size="50"></CellView> {{cell.check_time}}</li>
            </ul>
        </div>
</div>
</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "./Bingo.ts";
import BingoView from "./BingoView.vue";
import CellView from "./CellView.vue";

export type DataType ={
    detail_view: Boolean,
}

export default Vue.extend({
    data(): DataType {
        return {
            detail_view:false,
        };
    },
    computed:{
        main_cell():Cell{
            return this.bingo.cell_last_checked ? this.bingo.cell_last_checked : this.bingo.cells[0][0]
        }
    },

    props: {
        bingo: {
            type: Bingo,
            required: true
        },
        size:{
            type: Number,
            required: true
        }
    },
    created(){

    },

    components: {
        BingoView,
        CellView
    },

    methods: {
        toggleView(){
            this.detail_view = !this.detail_view;
        }
  },
});
</script>
<style scoped>
    div .main{
        margin: 10px;
        padding: 5px;
    }
    .title{
  color: #010079;
  text-shadow: 0 0 5px white;
  padding: 0.3em 0.5em;
  background: -webkit-repeating-linear-gradient(-45deg, #cce7ff, #cce7ff 3px,#e9f4ff 3px, #e9f4ff 7px);
  background: repeating-linear-gradient(-45deg, #cce7ff, #cce7ff 3px,#e9f4ff 3px, #e9f4ff 7px);
    }
</style>