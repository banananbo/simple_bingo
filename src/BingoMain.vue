<template>
<div>
    <Header></Header>
    <div class="container-fluid text-center">
     <BingoView :bingo="this.$store.state.bingo" :size="size" @cellClick='onCellClicked'></BingoView>
    </div>
    <div v-if="!this.$store.state.bingo.is_playing" class="text-center">
        <button @click="startGame" class="btn btn-default">START!</button>
    </div>
    <div v-if="this.$store.state.bingo.is_playing">
        <ul class="list-group list-group-horizontal card-text mx-auto" style="max-width: 80%;">
                <li class="list-group-item">score:{{this.$store.state.bingo.score}}</li>
                <li class="list-group-item">bingo:{{this.$store.state.bingo.bingonum}}</li>
                <li class="list-group-item">time:{{timer}}</li>
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
    selectedCell: Cell,
    timer:string,
    timerObj:any
}

export default Vue.extend({
    data(): DataType {
        return {
            size: screen.width - 40,
            cellPop: false,
            selectedCell: null,
            timer: "",
            timerObj: null
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
            this.timerObj = setInterval(() => {(this).timer = Math.floor(this.$store.state.bingo.time/3600000)+":"+Math.floor(this.$store.state.bingo.time/60000)
            +":"+Math.floor(this.$store.state.bingo.time/1000)}, 1000);
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