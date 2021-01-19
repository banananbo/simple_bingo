<template>
<div>
    <Header></Header>
    <div class="container-fluid text-center">
     <BingoView :bingo="this.$store.state.bingo" :size="size" @cellClick='onCellClicked'></BingoView>
    </div>
    <div v-if="!this.$store.state.bingo.is_playing">
        <button @click="startGame">START!</button>
    </div>
    <div v-if="this.$store.state.bingo.is_playing">
        <ul>
            <li>score:{{this.$store.state.bingo.score}}</li>
            <li>bingo:{{this.$store.state.bingo.bingonum}}</li>
            <li>time:{{this.$store.state.bingo.time}}</li>
        </ul>
    </div>
    <ControlPop v-if="cellPop" :cell="selectedCell" @submit="submitCell" @cancel="cancellCell"></ControlPop>
    <nav class="navbar navbar-dark bg-dark fixed-bottom navbar-light bg-light">
      <router-link to="/create">再作成</router-link>
    </nav>
</div>
</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "./Bingo.ts";
import Header from "./Header.vue";
import BingoView from "./BingoView.vue";
import ControlPop from "./ControlPop.vue";

export type DataType ={
    size: number,
    cellPop: Boolean,
    selectedCell: Cell
}

export default Vue.extend({
    data(): DataType {
        return {
            size: screen.width - 40,
            cellPop: false,
            selectedCell: null
        };
    },
    computed:{

  },

    props: {
        // cell_size: {
        //     type: Number,
        //     required: true
        // },
        // bingo: {
        //     type: Bingo,
        //     required: true
        // }
    },
    mounted(){
        // this.bingo = this.$store.state.bingo;
        // console.log(this.$store.state.bingo);
    },

    components: {
        Header,
        BingoView,
        ControlPop
    },

    methods: {
        startGame(){
            this.$store.state.bingo.startGame();
        },
        onCellClicked: function(obj:any){
            console.log(1);
            console.log(this.$store.state.bingo.is_playing);
            if (!this.$store.state.bingo.is_playing) return;
            this.selectedCell = obj.cell
            this.cellPop = true;
        },
        onclick :function(obj:any){
            // this.count++;
            // this.$store.commit('increment');
        },
        submitCell :function(obj:any){
            obj.cell.check();
            this.cellPop = false;
            this.selectedCell = null;
            this.$store.state.bingo.checkBingo();
        },
        cancellCell :function(obj:any){
            obj.cell.unCheck();
            this.cellPop = false;
            this.selectedCell = null;
            this.$store.state.bingo.checkBingo();
        }
  },
});
</script>
<style scoped>
</style>