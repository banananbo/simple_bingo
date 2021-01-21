<template>
<div>
    <Header></Header>
    <div v-if="!this.$store.state.bingo.is_playing" :style='overlay_style' class="container-fluid text-center">
    </div>
    <div ref="bingoview" class="container-fluid text-center">
     <BingoView :bingo="this.$store.state.bingo" :size="size" @cellClick='onCellClicked'></BingoView>
    </div>
    <div v-if="!this.$store.state.bingo.is_playing" class="text-center">
        <button @click="startGame" class="btn btn-primary">START!</button>
    </div>
    <div v-if="this.$store.state.bingo.is_playing">
        <ul class="list-group list-group-horizontal  mx-auto" style="max-width: 80%;">
                <li class="list-group-item">score:{{this.$store.state.bingo.score}}</li>
                <li class="list-group-item">bingo:{{this.$store.state.bingo.bingonum}}</li>
                <li class="list-group-item">time:{{timer}}</li>
        </ul>
        <section class="text-center">
            <button type="button" class="btn btn-primary" @click="clickEndBtn">おわる</button>
        </section>
    </div>
    <ControlPop v-if="cellPop" :cell="selectedCell" @submit="submitCell" @cancel="cancellCell"></ControlPop>
    <EndPop v-if="endPop" :bingo="this.$store.state.bingo" :timer="timer" @submit="endGame" @cancel="endPop=false"></EndPop>
    <Footer></Footer>
</div>
</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "./Bingo.ts";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import BingoView from "./BingoView.vue";
import CellView from "./CellView.vue";
import ControlPop from "./ControlPop.vue";
import EndPop from "./EndPop.vue";
import BingoOverlay from "./BingoOverlay.vue";
import DateFunc from "./mixin/date_func.ts";

export type DataType ={
    size: number,
    cellPop: Boolean,
    endPop: Boolean,
    selectedCell: Cell,
    timer:string,
    timerObj:any,
    bingo_w:number,
    bingo_h:number,
    overlay_color:string
}

export default Vue.extend({
    data(): DataType {
        return {
            size: screen.width - 40,
            cellPop: false,
            endPop: false,
            selectedCell: null,
            timer: "",
            timerObj: null,
            bingo_w:100,
            bingo_h:100,
            overlay_color: "#9996"
        };
    },
    mixins: [DateFunc],
    computed:{
        overlay_style():object{
            return {
                "height": this.bingo_h+"px",
                "width" : this.bingo_w+"px",
                "background-color" : this.overlay_color,
                "position" : "absolute"
            }
        }
    },
    watch: {
    //   'size': {
    //       handler: function () {
    //           this.initBingo();
    //       }
    //   },
      // 'cell_num': {
      //     handler: function () {
      //       console.log("change cell num");
      //       this.initBingo();
      //     }
      // }
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
    created(){
        if(!this.$store.state.bingo){
            // プレイ中のbingo無し
            this.$router.push("/create"); return; 
        }
    },
    mounted(){
        this.$store.state.bingo.checkBingo();
        this.timerObj = setInterval(() => {
            if (this.$store.state.bingo.time==0) return;
            this.timer = (this as any).format_to_time(this.$store.state.bingo.current_time)
         }, 1000);
         this.$store.state.bingo.on( 'all_clear' ,()=>{ this.onClearBingo() } )

         console.log((this.$refs.bingoview as Element).clientWidth)
         console.log((this.$refs.bingoview as Element).clientHeight)
         console.log((this.$refs.bingoview as Element).clientTop)
         console.log((this.$refs.bingoview as Element).clientLeft)
         this.bingo_w = (this.$refs.bingoview as Element).clientWidth;
         this.bingo_h = (this.$refs.bingoview as Element).clientHeight;
    },
    beforeDestroy(){
        clearInterval(this.timerObj);
    },


    components: {
        Header,
        Footer,
        BingoView,
        ControlPop,
        EndPop,
        CellView
    },

    methods: {
        endGame(){
            this.$store.state.bingo.endGame();
            this.$store.commit('saveBingoData');
            this.$store.commit('addToBingoArchives',this.$store.state.bingo);
            this.$store.commit('setBingoData',null);
            this.$router.push('result');
        },
        clickEndBtn(){
            this.endPop = true;
        },
        startGame(){
            this.$store.state.bingo.startGame();
            this.$store.commit('saveBingoData');
         },
        onCellClicked: function(obj:any){
            if (!this.$store.state.bingo.is_playing) return;
            this.selectedCell = obj.cell
            this.cellPop = true;
            console.log(this.$store.state.bingo.cells_checked);
        },
        onclick :function(obj:any){
            // this.count++;
            // this.$store.commit('increment');
        },
        submitCell :function(obj:any){
            obj.cell.check();
            this.cellPop = false;
            this.selectedCell = null;
            // this.$store.state.bingo.checkBingo();
            this.$store.commit('saveBingoData');
        },
        cancellCell :function(obj:any){
            obj.cell.unCheck();
            this.cellPop = false;
            this.selectedCell = null;
            this.$store.state.bingo.checkBingo();
            this.$store.commit('saveBingoData');
        },
        onClearBingo : function():void{
            this.clickEndBtn();
        }
  },
});
</script>
<style scoped>
</style>