<template>
<div v-if="this.$store.state.bingo">
    <BingoOverlay :width="bingo_w" :height="bingo_h" @afterPerfectAnime='onClearBingo'></BingoOverlay>
    <div ref="bingoview">
     <BingoView :bingo="this.$store.state.bingo" :size="size" @cellClick='onCellClicked'></BingoView>
    </div>
    <div style="margin-top:10px">
        <div v-if="!this.$store.state.bingo.is_playing" class="text-center ">
            <button @click="startGame" class="btn btn-primary">スタート！</button>
        </div>
        <div id="score_container" v-if="this.$store.state.bingo.is_playing">
            <ScoreView :timer="timer" :bingo="$store.state.bingo"></ScoreView>
             <section class="inline">
                    <button type="button" class="btn btn-primary" @click="clickEndBtn">{{$t("function.finish")}}</button>
            </section>

        </div>
    </div>
    <ControlPop v-if="cellPop" :cell="selectedCell" @submit="submitCell" @cancel="cancellCell" @close="cellPop = false;"></ControlPop>
    <EndPop v-if="endPop" :bingo="this.$store.state.bingo" :timer="timer" @submit="endGame" @cancel="endPop=false" @remove="confirmDiscard"></EndPop>
    <DiscardGamePop v-if="view_discardPop" @discard="discardGame" @cancel="view_discardPop = false"></DiscardGamePop>
</div>
</template>
<script lang="ts">
import Vue from "vue"
import {Cell} from "@lib/bingo/Cell";
import BingoView from "@organisms/BingoView.vue";
import ScoreView from "@atoms/ScoreView.vue";
import CellView from "@organisms/CellView.vue";
import ControlPop from "@organisms/ControlPop.vue";
import EndPop from "@organisms/EndPop.vue";
import BingoOverlay from "@organisms/BingoOverlay.vue";
import DateFunc from "@mixin/date_func";
import DiscardGamePop from "@organisms/DiscardGamePop.vue";


export type DataType ={
    size: number,
    cellPop: Boolean,
    endPop: Boolean,
    selectedCell: Cell,
    timer:string,
    timerObj:any,
    bingo_w:number,
    bingo_h:number,
    view_discardPop:Boolean
}

export default Vue.extend({
    data:function():DataType {
        return {
            size: screen.width - 40,
            cellPop: false,
            endPop: false,
            selectedCell: null,
            timer: "",
            timerObj: null,
            bingo_w:100,
            bingo_h:100,
            view_discardPop: false,
        };
    },
    mixins: [DateFunc],
    computed:{

    },
    watch: {
     },

    props: {

    },
    beforeCreate(){
        if(!this.$store.state.bingo){
            // プレイ中のbingo無し
            this.$router.push("/create"); return; 
        }
    },
    mounted(){
        if(!this.$store.state.bingo){
            // プレイ中のbingo無し
            return; 
        }
        this.$store.state.bingo.checkBingo();
        this.timerObj = setInterval(() => {
            if (this.$store.state.bingo.time==0) return;
            this.timer = (this as any).format_to_time(this.$store.state.bingo.current_time)
         }, 1000);
         this.bingo_w = (this.$refs.bingoview as Element).clientWidth;
         this.bingo_h = (this.$refs.bingoview as Element).clientHeight;
    },
    beforeDestroy(){
        clearInterval(this.timerObj);
    },


    components: {
        BingoView,
        ControlPop,
        EndPop,
        CellView,
        BingoOverlay,
        DiscardGamePop,
        ScoreView
    },

    methods: {
        async endGame(){
            this.$store.state.bingo.endGame();
            this.$store.commit('saveBingoData');
            // this.$store.commit('addToBingoArchives',this.$store.state.bingo);
            await this.$store.dispatch('archives/addToBingoDBArchives');
            // context.commit('archives/addToBingoArchivesLocal');

            console.log('saved finish');
            const newId = this.$store.state.bingo.id;

            this.$store.commit('removeBingoData',null);
            this.$router.push(`result/`+newId);
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
            this.cellPop = false;
            this.selectedCell = null;
            obj.cell.check( this.$store.state.user_setting.allow_location );
            
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
        },
        confirmDiscard: function(){
            this.endPop=false;
            this.view_discardPop = true;
        },
        discardGame: function(){
            this.view_discardPop = false;
            this.$router.push('/');
        }
  },
});
</script>
<style scoped>
.inline{
  display: inline-block;
  vertical-align: middle;
}
</style>